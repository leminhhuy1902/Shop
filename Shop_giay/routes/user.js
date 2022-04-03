var express = require('express');
var router = express.Router();
var db = require('../models/database')
var modelUser = require('../models/models_user');
/* GET users listing. */
router.get('/login', function(req, res) {
    req.session.destroy();
    req.session = "";
    res.render('login.ejs', { session: req.session})
});

router.post('/login', function(req, res, next) {
    let e = req.body.email;
    let p = req.body.password;
    let sql = `SELECT * FROM user WHERE email = '${e}' AND password = '${p}'`;
    db.query(sql, (err, rows) => {
        if (rows.length <= 0) {
            let mess = `Email hoặc mật khẩu của bạn sai xin kiểm tra lại!`;
            req.session.mess = mess;
            console.log(req.session);
            res.render('login.ejs', { session: req.session})
            return;
        }
        let user = rows[0];
        let pass_fromdb = user.password;
        let email_fromdb = user.email;
        var kq = pass_fromdb === p && email_fromdb === e;
        console.log(kq)

        if (kq) {
            req.session.User = {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.role,
                logIn: true
            };
            console.log(req.session);
            if (req.session.back) {
                console.log(req.session.back);
                res.redirect(req.session.back);
            } else {
                if(req.session.User.role === "ADMIN") {
                    res.redirect("/admin");
                } else {
                    res.redirect("/");
                }
            }
        } else {
            console.log("Not OK");
            res.redirect("/login");
        }
    });
});


router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/login");
});

router.get('/register', (rep, res) => {
    res.render('register.ejs', { session: rep.session})
})

router.post('/register', async function(req, res, next) {
    let ten = req.body.name;
    let em = req.body.email;
    let phone = req.body.phone;
    let p = req.body.password;
    let rp = req.body.retypePassword;
    let id = Date.now().toString();
    let checkEmail = await modelUser.checkEmail(em); // Kiểm tra email có trong database hay không
    if (checkEmail) { // Nếu email có trong database
        let mess = `Email ${em} của bạn đã tồn tại!`;
        console.log(mess);
        req.session.mess = mess;
        res.redirect("/register");
    } else {
        if (p === rp && p != "") {
            let user_info = {id: id, name: ten, email: em, password: p, phone: phone, role: "USER" };
            let sql = 'INSERT INTO user SET ?';
            db.query(sql, user_info);
        } else {
            let mess = `Mật khẩu không khớp nhau xin kiểm tra lại!`;
            req.session.mess = mess;
            res.redirect("/register");
        }

        res.redirect("/login"); 
    }
})

module.exports = router;