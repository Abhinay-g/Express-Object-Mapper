var to_json = require('xmljson').to_json;
var to_xml = require('xmljson').to_xml;
var csvjson = require('csvjson');
var csv=require('csvtojson')
var convert = require('xml-js');

var optionsCSVtoJSON = {
    delimiter : ',', // default
    quote     : '"' // default
  };
  var optionsJsontoCSV = {
    delimiter   : ",",
    wrap        : false
  }

var convertCSVtoJSON= function(input){
    var output =csvjson.toObject(input, optionsCSVtoJSON);
    return output;
  }
 var convertJSONtoCSV =  function (input){
    var output=csvjson.toCSV(input, optionsJsontoCSV);
    return output;
  }
// var convertXMLToJSON = function (input){
//     var output;
//     to_json(input,function(error,data){
//       output=data;
//     })
//     return output;
//   }

var convertXMLToJSON = function (input){
  var output;
  var parseString = require('xml2js').parseString;
  parseString(input,{explicitArray:false}, function (err, result) {
    output=result;
});
return output
} 

  var convertJSONtoXML= function (input){
    var xml2js = require('xml2js');
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(input);
    return xml
  }


  var convertTABtoJSON=  function (input){
    var re = new RegExp(' ', 'g');
    var newcsvdata= input.replace(re, ',');
    var output =convertCSVtoJSON(newcsvdata);
    return output;
  }

  var convertJSONtoTab=  function (input){
    var csvtab= convertJSONtoCSV(input)
    var re = new RegExp(',', 'g');
    var newcsvdata= csvtab.replace(re, ' ');
    return newcsvdata;
  }

module.exports={convertCSVtoJSON,convertJSONtoCSV,convertXMLToJSON,convertJSONtoXML,convertTABtoJSON,convertJSONtoTab}
