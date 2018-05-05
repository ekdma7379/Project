var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel').hotelModel;
var Comment = require('../models/comment').commentModel;
var common = require('../config/etc');
var Book = require('../models/book').bookModel;

/* GET home page. */

router.post('/comment/write', function (req, res, next) {

    if (!req.user) {
        console.log('로그인!')
        res.send({
            error: "로그인을 해주세요."
        })
    }

    var hotelId = req.body.hotelId;
    var userId = req.user._id;
    var content = req.body.content;
    var point = req.body.point;

    if (!hotelId || !userId || !content || !point) {
        console.log('inavlid params');
        return;
    }

    Comment.findOne({
        userId: userId,
        hotelId: hotelId
    }, function (err, comment) {
        if (comment) {
            res.send({
                error: "이미 리뷰를 다셨습니다. 리뷰는 웹툰당 한 번만 쓸 수 있습니다."
            })
        } else {
            var commentObject = new Comment();
            commentObject.content = content;
            commentObject.point = point;
            commentObject.userId = userId;
            commentObject.hotelId = hotelId;
            commentObject.regdate = common.regDateTime();
            commentObject.save();
            Comment.populate(commentObject, {
                path: "userId"
            }, function (err, populateComment) {
                res.send(populateComment);
            });

        }
    });
});
router.get('/:books_id', function (req, res, next) {
    var books_id = req.params.books_id;
    console.log('id=', books_id);
    var isRead = true;

    if (!books_id) {
        console.log('파라미터 에러');
    }
    Book.findOne({
        _id: books_id
    }, function (err, doc) {
        if (err) next(err);

        if (!doc) {
            console.log('책이없음');
            next(err);
        }
        console.log('doc=', doc);
        res.render('hotel/book', {
            title: "gweewf",
            user: req.user,
            book: doc
        });

    });
});

router.get('/', function (req, res, next) {
    Hotel.find({}, '-__v', function (err, docs) {
        res.json({
            hotel: docs
        })
    })
});

module.exports = router;
