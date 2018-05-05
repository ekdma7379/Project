// 인증 정보
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jwt-simple');
var User = require('../models/user').userModel;; // 사용자 모델
var configAuth = require('./auth');



// App.Exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // 로컬 로그인
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            console.log('email=', email);
            console.log('password=', password);
            User.findOne({
                'email': email
            }, function(err, user) {
                console.log('user=', user);
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', '아이디가 없습니다.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', '비밀번호가 틀렸습니다.'));
                req.flash('successMessage', "로그인 성공!");
                return done(null, user);
            });

        }));

    // 회원가입
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            process.nextTick(function() {
                User.findOne({
                    'email': email
                }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('loginMessage', '회원가입이 되어 있는 이메일입니다.'));
                    } else {
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.name = req.body.name;
                        newUser.job = req.body.job;
                        newUser.age = req.body.age;
                        newUser.incomeLevel = req.body.incomeLevel;
                        newUser.isLove = req.body.isLove;
                        newUser.sex = req.body.sex;
                        newUser.token = jwt.encode(email, configAuth.jwt_secret);
                        console.log('newUser=', newUser);
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            req.flash('successMessage', "회원가입 성공!");
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

};
