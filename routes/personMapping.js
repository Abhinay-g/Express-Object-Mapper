// *start declarations
var express = require('express');
var router = express.Router();
var jp = require('jsonpath');
var fs = require('fs');
var path = require('path');
// var http = require("http");
var request = require('request');
var converterUtility= require('../Utilities/converterFunctions.ts')
var mappingUtility= require('../Utilities/mappingFunctions.ts')
// our data model
var personMapping= require('../Mapper/PersonMapper.ts') // not in use
// library imports
const deepMap = require('deep-map');   // mapping schena 
const template = require('lodash/template');  // mapping schema

// foreign data
var jsonmappingobject= JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Mapper/clientMapper.json'), 'utf8'));
var serverJSONmappingObject= JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Mapper/serverMapper.json'), 'utf8'));

//  var jresult= convertFormat(jsonmappingobject)
converterUtility.convertServerDataToClientDataFormat(jsonmappingobject)
converterUtility.convertClientDataToServerDataFormat(serverJSONmappingObject)

// JSON.stringify() Object ==> JSON
// JSON.parse()     JSON   == Object

// var options = {
//     host: 'localhost',
//     port: 3002,
//     path: '/users/getClientData'
//   };


router.get('/getJSONPersonMapping', function(req,res,next){
// calling client API using http
// http.get(options,  function(res) {
//     var buffer = '';
//     res.on("data", function(chunk) {
//         buffer+= chunk;
//         sendData(buffer);
//     });
//   }).on('error', function(e) {
//     console.log("Got error: " + e.message);
//   });

  request.get(
    'http://localhost:3002/users/getJSONClientData',
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            sendData(body)
        }
        });


  //call back method to send response from middleware to Frontend
  function sendData(buffer){
      var JSONbuffer = JSON.parse(buffer)
      var resultSet=[];
      
      for(chunk in JSONbuffer){
        console.log(JSONbuffer[chunk]);
        // JS object is needed for ocnverting and mapping  
        resultSet.push(deepMap(jsonmappingobject, value => template(value)(JSONbuffer[chunk])))
      }
    return res.send(resultSet);
  }
  });


  router.get('/getXMLPersonMapping', function(req,res,next){
      request.get(
        'http://localhost:3002/users/getXMLClientData',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                sendData(body)
            }
            });

            
      //call back method to send response from middleware to Frontend
      function sendData(buffer){
        // var JSONbuffer =JSON.parse(JSON.stringify(mappingUtility.convertXMLToJSON(buffer)))
        var JSONbuffer= mappingUtility.convertXMLToJSON(buffer)
        // console.log(JSON.stringify(JSONbuffer))
        // var jso= JSON.parse(JSONbuffer)
        // console.log("SJO SDGSD G",jso);
        
        var resultSet=[];
        for(var i in JSONbuffer) {
            for(var j in JSONbuffer[i]){
                resultSet.push(deepMap(jsonmappingobject, value => template(value)(JSONbuffer[i][j])))
            }
        }
        // for(chunk in JSONbuffer.dataseed){
        //     // resultSet.push(deepMap(jsonmappingobject, value => template(value)(JSONbuffer[chunk])))
        //     console.log("Child",JSONbuffer[chunk])
        // }
        return res.send(resultSet);
      }
      });




  router.post('/postPersonMapping', function(req, res, next) {
        var body = '';
        req.on('data', function (data) {
            //JSON.stringify(deepMap(serverJSONmappingObject, value => template(value)(data)));

            var JSONbuffer = JSON.parse(data)
            var resultSet=[];
            for(chunk in JSONbuffer){
                resultSet.push(deepMap(serverJSONmappingObject, value => template(value)(JSONbuffer[chunk])))
            }
            body = JSON.stringify(resultSet);
            console.log(body)
              request.post(
                'http://localhost:3002/users/postClientData',
                { body},
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                        sendData(body)
                    }
                }
            );
        });
       function sendData(body){
           return res.send(body)
       }

  });

module.exports = router;
