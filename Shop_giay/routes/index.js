var express = require('express');
var router = express.Router();
var modelProduct = require('../models/models_product'); //nhúng model products vào controller này để sử dụng
var modelCatalog = require('../models/models_category');
var modelColor = require('../models/models_color');
var modelSize = require('../models/models_size');


router.get('/cart', async (req, res) => {
    let listPro = [];
    let tongGia = 0
    if(req.session.idCart !== undefined) {
        for(item of req.session.idCart) {
            let product = await modelProduct.getProductById(item.id);
            product[0].soLuong = item.soLuong;
            tongGia += product[0].price * item.soLuong;
            listPro.push(product[0]);
        }
    }

    console.log(listPro);
    res.render('cart.ejs', { session : req.session, listPro: listPro, tongGia: tongGia})
})






module.exports = router;