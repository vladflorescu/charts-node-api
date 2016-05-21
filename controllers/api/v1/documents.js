'use strict';

let mongoose = require('mongoose');
let Document = mongoose.model('Document');
let XLSX = require('xlsx');

exports.upload = function(req, res) {
  Document.find().exec((err, documents) => {
    if (err) res.status(400).send(err);

    let arraybuffer = req.file.buffer;
    let data = new Uint8Array(arraybuffer);
    let arr = new Array();
    for(let i = 0; i != data.length; ++i) 
      arr[i] = String.fromCharCode(data[i]);
    let bstr = arr.join("");
   
    let workbook = XLSX.read(bstr, {type:"binary"});
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];

    let jsons = XLSX.utils.sheet_to_json(worksheet);

    console.log(jsons);

    res.json({ documents: documents });
  })
};