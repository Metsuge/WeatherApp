const fs = require('fs');

let jsondata = fs.readFileSync('city.list.json');
let readdata = JSON.parse(jsondata);
let LTCityArray = [];

for(let i=0;i<readdata.length;i++){
  if(readdata[i].country === "LT"){
    LTCityArray.push(readdata[i])
  }
}


let jsonLTArray = JSON.stringify(LTCityArray);

fs.writeFileSync('lt-city-names.json', jsonLTArray);