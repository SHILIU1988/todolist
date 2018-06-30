//user登陆的名字和密码
// var user = require('./users').user;


// exports.login = function (req, res) {
//     res.render('signin', {
//         title: '登 录'
//     });
// };

// //实时登陆
// exports.next = function (req, res, next) {
//     if (req.body.userid === user.userid && req.body.password === user.password) {
//         req.session.user = user;
//         return res.render('slindex',{
//             title: 'slindex',
//         });
//     } else {
//         return res.render('signin', {
//             title: ' 登 录'
//         });
//     }
// };

// exports.logout = function (req, res) {
//     req.session.user = null;
//     req.session.error = null;
//     res.render('signin',{
//         title: '登录'
//     });
// };