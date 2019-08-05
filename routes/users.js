// *start declarations
var express = require('express');
var router = express.Router();
var datanode= require('../Data/jsondata.ts')
var fs = require('fs');
var path = require('path');
var js2xmlparser = require("js2xmlparser");
var jsonxml = require('jsontoxml');
var xml2js = require('xml2js');
var convert = require('xml-js');

var to_json = require('xmljson').to_json;
var to_xml = require('xmljson').to_xml;
var csvjson = require('csvjson');
const csv=require('csvtojson')
// var jsonxml = require('jsontoxml');

var csvdata = fs.readFileSync(path.join(process.cwd(), 'Data/csvData.csv'), { encoding : 'utf8'});
var tabcsvdata = fs.readFileSync(path.join(process.cwd(), 'Data/tabcsvData.csv'), { encoding : 'utf8'});
var jsonMappingobject= JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Data/jsonData.json'), 'utf8'));



var optionsCSVtoJSON = {
  delimiter : ',', // default
  quote     : '"' // default
};
var optionsJsontoCSV = {
  delimiter   : ",",
  wrap        : false
}
//   *end declarations

// *start API method
router.get('/getReq', function(req,res,next){
  var xmlOutput=convertToXML((datanode))
  var jsonOutput= convertToJSON(xmlOutput)
  // var CSVtoJSONresult = convertCSVtoJSON(csvdata); //final working
  // var JSONtoCSVresult=convertJSONtoCSV(CSVtoJSONresult);  //final working
  // var TABtoJSON= convertTABtoJSON(tabcsvdata);
  // var JSONtoTAB= convertJSONtoTab(TABtoJSON)
  // var output= convert.xml2json(xml, {compact: false, spaces: 4});
  // var o=jsonxml(JSON.parse(datanode))
  
  return res.send(jsonOutput)
})


router.put('/putReq', function (req, res, next) {
  return res.status(201).json({status:"Put Success"});
});

router.post('/postReq', function (req, res, next) {
  return res.status(201).json({status:"post Success"});
});
router.delete('/deleteReq', function (req, res, next) {
  return res.status(201).json({status:"delete Success"});
});
// *end API methods
// *start Utility method

function convertCSVtoJSON(input){
  var output =csvjson.toObject(input, optionsCSVtoJSON);
  return output;
}
function convertJSONtoCSV(input){
  var output=csvjson.toCSV(input, optionsJsontoCSV);
  return output;
//   var xml2js = require('xml2js');
//   var builder = new xml2js.Builder();
// var xml = builder.buildObject(obj);
// return xml
}
function convertToJSON(input){
   var output={"name":"abhinay"} ;
  // to_json(input,function(error,data){
  //   output=data;
  // }) 
  // return output;
  var parseString = require('xml2js').parseString;
  parseString(input,{explicitArray:false}, function (err, result) {
    output=result
});
return output
}

function convertToXML(input){
  // var options = {compact: true, ignoreComment: true, spaces: 4};
  // var output=convert.json2xml(input,options);
  // return output;

    var xml2js = require('xml2js');
  var builder = new xml2js.Builder();
var xml = builder.buildObject(input);
return xml
}


function  convertTABtoJSON(input){
  var re = new RegExp(' ', 'g');
  var newcsvdata= input.replace(re, ',');
  var output =convertCSVtoJSON(newcsvdata);
  return output;
}

function convertJSONtoTab(input){
  var csvtab= convertJSONtoCSV(input)
  var re = new RegExp(',', 'g');
  var newcsvdata= csvtab.replace(re, ' ');
  return newcsvdata;
}
// *end Utility method

module.exports = router;
