'use strict';

let mongoose = require('mongoose');
let Document = mongoose.model('Document');
let XLSX = require('xlsx');

exports.upload = function(req, res) {
  Document.find().exec((err, documents) => {
    if (err) res.status(400).send(err);

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
    // console.log(range);
    let startRow = parseInt(range[1]);
    let endRow = parseInt(range[4]);
    let startColumn = range[0].charCodeAt(0);
    let endColumn = range[3].charCodeAt(0);

    let values = [];
    if(endRow == 2) {
      for(let column = startColumn; column <= endColumn; ++column) {
        let keyAddress = String.fromCharCode(column) + 1;
        let valAddress = String.fromCharCode(column) + 2;
        values.push({ key: worksheet[keyAddress].v, 
                      val: worksheet[valAddress].v });
      }
    } else {
      for(let column = startColumn + 1; column <= endColumn; ++column) {
        let keyAddress = String.fromCharCode(column) + 1;
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
    }

    console.log(values);

    res.json({ id: "1234",
               values: values });
  })
};  
