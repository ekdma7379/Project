var eyes = require('eyes');
var https = require('http');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

parser.on('error', function (err) { console.log('Parser error', err); });

var data = '';
https.get('http://data4library.kr/api/recommandList?authKey=35c9131f8a67f30ae9b9e606dd736b06e70519e97843978c10faa57c1acb9cb5&isbn13=9788983921987', function (res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
        res.on('data', function (data_) { data += data_.toString(); });
        res.on('end', function () {
            parser.parseString(data, function (err, result) {
                //console.log('data=', result['response']['docs'][0]['book'][0]['bookname'][0]);
                console.log('data=', result['response']['docs'][0]['book'][0]['bookImageURL'][0]);
            });
        });
    } else {
        console.log('실패');
    }
});