var express = require('express');
var router = express.Router();

var Location = require('../models/location').locationModel;
var Hotel = require('../models/hotel').hotelModel;
var Book = require('../models/book').bookModel;

var eyes = require('eyes');
var https = require('http');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


router.get('/search', function (req, res, next) {
    res.render('hotel/search', {
        title: '호텔 검색',
        hotel: null,
        user: req.user
    });
});

router.post('/search', function (req, res, next) {
    console.log('value=', req.body.name);
    console.log('type=', req.body.type);
    var type = req.body.type;
    var name = req.body.name;
    if (type == "" || !type) {
        type = "name"
    }
    if (name == "") {
        name = "wefij23f289f289524m2lkj9wefm23o";
    }
    var options;
    if (type == "name") {
        options = {
            name: new RegExp(name, "i")
        }
    } else {
        options = {
            address: new RegExp(name, "i")
        }
    }
    Hotel.find(options)
        .limit(10)
        .exec(function (err, docs) {
            if (err) console.log('err=', err);
            console.log('results=', docs);
            res.send({
                title: '웹툰 검색',
                hotels: docs,
                user: req.user
            });
        });
});

router.post('/', function (req, res, next) {
    var location = req.body.location;
    if (!location) {
        location = "서울";
    }
    console.log('_id=', location);
    Location.find({}, function (err, other) {
        var filter = {
            address: new RegExp(location, "i")
        };
        var options = {
            limit: 16,
        };
        Hotel.findRandom(filter, {}, options, function (err, results) {
            console.log(results);
            res.send({
                title: '도서 추천 시스템',
                hotels: results,
                location: other,
                user: req.user
            });
        });
    });
});
/* GET home page. */


router.get('/xml', function (req, res, next) {

    parser.on('error', function (err) { console.log('Parser error', err); });

    var data = '';
    https.get('http://data4library.kr/api/recommandList?authKey=35c9131f8a67f30ae9b9e606dd736b06e70519e97843978c10faa57c1acb9cb5&isbn13=9788983921987', function (res) {
        if (res.statusCode >= 200 && res.statusCode < 400) {
            res.on('data', function (data_) { data += data_.toString(); });
            res.on('end', function () {
                parser.parseString(data, function (err, result) {
                    //console.log('data=', result['response']['docs'][0]['book'][0]['bookname'][0]);
                    var books = result['response']['docs'][0]['book']
                    for(var i=0; i<books.length; i++) {
                        var book = new Book();
                        book.bookname = books[i]['bookname'][0];
                        book.author = books[i]['authors'][0];
                        book.publisher = books[i]['publisher'][0];
                        book.publisher_year = books[i]['publication_year'][0];
                        book.image = books[i]['bookImageURL'][0];
                        book.save(function (err, doc) {
                            if (err) return handleError(err);
                            console.log('doc=' ,doc);
                        });
                    }
                    
                });
            });
        } else {
            console.log('실패');
        }
    });
    res.json({
        'result': 'ok'
    });
});
    

router.get('/', function (req, res, next) {
    Book.find({}, function (err, books) {
        res.render('books', {
            title: '도서 추천 시스템',
            books: books,
            user: req.user
        });
    });
});


module.exports = router;
