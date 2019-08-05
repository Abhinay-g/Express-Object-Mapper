var  convertServerDataToClientDataFormat= function(input){
    for(let i in input){
        if(typeof input[i]=="object" ){
            convertServerDataToClientDataFormat(input[i])
        }
        else{
            var re = new RegExp(' ', 'g');
            input[i]= input[i].replace(re, '+" "+');
            input[i]="<%- " + input[i] +" %>"
        }
    }
}
var convertClientDataToServerDataFormat=function (input){
    for(let i in input){
        if(typeof input[i]=="object" ){
            convertClientDataToServerDataFormat(input[i])
        }
        else{
            // var re = new RegExp("' '", 'g');
            // input[i]= input[i].replace(re, '+" "+');
            input[i]='<%- ' + input[i] +' %>'
        }
    }
}

module.exports={convertServerDataToClientDataFormat,convertClientDataToServerDataFormat}