'use strict';

let mongoose = require('mongoose');
let Unidata = mongoose.model('Unidata');
let Bidata = mongoose.model('Bidata');
let XLSX = require('xlsx');

exports.upload = function(req, res) {
  let data = new Uint8Array(req.file.buffer);
  let array = new Array();
  for(let i = 0; i !== data.length; ++i) {
    array[i] = String.fromCharCode(data[i]);
  }
  let bstr = array.join("");
 
  let workbook = XLSX.read(bstr, {type:"binary"});
  let firstSheetName = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[firstSheetName];

  let range = worksheet['!ref'];
  let startRow = parseInt(range[1]);
  let endRow = parseInt(range[4]);
  let startColumn = range[0].charCodeAt(0);
  let endColumn = range[3].charCodeAt(0);

  // if(endRow < 2) res.status(422).send();

  // Remove empty lines
  let cellAddress = String.fromCharCode(startColumn + 1) + startRow;
  while(!isSomething(worksheet[cellAddress])) {
    ++startRow;
    cellAddress = String.fromCharCode(startColumn + 1) + startRow;
  }

  let values = [];
  let dataType = '';
  let dataDesc = {};

  if(endRow - startRow === 1) {
    dataType = 'unidimensionalDataset';
    for(let column = startColumn; column <= endColumn; ++column) {
      let keyAddress = String.fromCharCode(column) + startRow;
      let valAddress = String.fromCharCode(column) + (startRow + 1);
      values.push({ key: worksheet[keyAddress].v, 
                    val: worksheet[valAddress].v });
    }

    Unidata.create({ title: firstSheetName, values: values }, function (err, unidata) {
      if (err) console.log(err);
      dataDesc[dataType] = { id: unidata._id, title: unidata.title, values: unidata.values };
      res.json(dataDesc);
      console.log(dataDesc);
    });
  } else {
    dataType = 'bidimensionalDataset';
    for(let column = startColumn + 1; column <= endColumn; ++column) {
      let keyAddress = String.fromCharCode(column) + startRow;
      let val = [];
      for(let row = startRow + 1; row <= endRow; ++row) {
        let subKeyAddress = String.fromCharCode(startColumn) + row;
        let valAddress = String.fromCharCode(column) + row;

        val.push({ key: worksheet[subKeyAddress].v, 
                   val: worksheet[valAddress].v });
      }
      values.push({ key: worksheet[keyAddress].v, 
                    val: val });
    }

    Bidata.create({ title: firstSheetName, values: values }, function (err, bidata) {
      if (err) console.log(err);
      dataDesc[dataType] = { id: bidata._id, title: bidata.title, values: bidata.values };
      res.json(dataDesc);
      console.log(dataDesc);
    });
  }
};  

exports.descriptions = function(req, res) {
  let dataDesc = {};

  Unidata.find().exec((err, unidatas) => {
    if (err) res.status(400).send(err);
    let descArray = [];
    unidatas.forEach(unidata => descArray.push({id: unidata._id, title: unidata.title}));
    console.log(descArray);
    dataDesc['unidimensionalDatasets'] = descArray;

    Bidata.find().exec((err, bidatas) => {
      if (err) res.status(400).send(err);
      let descArray = [];
      bidatas.forEach(bidata => descArray.push({id: bidata._id, title: bidata.title}));
      dataDesc['bidimensionalDatasets'] = descArray;

      res.json(dataDesc);
    });
  });
};  

function isSomething(x) {
  return x !== null && typeof(x) !== 'undefined';
}



