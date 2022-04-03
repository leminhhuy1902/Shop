var express = require('express');
var router = express.Router();
var modelProduct = require('../models/models_product'); //nhúng model products vào controller này để sử dụng
var modelCatalog = require('../models/models_category');
var modelColor = require('../models/models_color');
var modelSize = require('../models/models_size');


router.get('/shop', async function(req, res) {
    let idCat = req.query.idCat;
    let idColor = req.query.idColor;
    let idSize = req.query.idSize;
    let listPro = [];
    if(idCat !== undefined) {
        listPro = await modelProduct.getProductByCategory(idCat);  //cách gọi hàm trong model, để có dữ liệu từ db
    } else if(idColor !== undefined) {
        listPro = await modelProduct.getProductByColor(idColor);
    } else if(idSize !== undefined) {
        listPro = await modelProduct.getProductBySize(idSize);
    } else {
        listPro = await modelProduct.list(); //cách gọi hàm trong model, để có dữ liệu từ db
    }
    let listCat = await modelCatalog.list();
    let listColor = await modelColor.list();
    let listSize = await modelSize.list();
    res.render('category.ejs', {listPro: listPro, listCat: listCat, listColor: listColor, listSize: listSize, session: req.session});
})

router.get('/details', async function(req, res) {
    let id = req.query.id;
    let product = await modelProduct.getProductById(id);
    console.log(product);
    res.render('details.ejs', {product: product[0], session: req.session});
  })

router.get('/add_cart', async function(req, res) {
    if(req.session.User === undefined) {
        req.session.mess = "Vui lòng đăng nhập trước khi mua hàng xin cảm ơn!";
        res.render('login.ejs', { session: req.session})
    }
    let id = req.query.id;
    if(req.session.idCart === undefined) {
        let ids = [];
        ids.push({
            id: id,
            soLuong: 1
        });
        req.session.idCart = ids;
    } else {
        let checkAddCart = true;
        for(item of req.session.idCart) {
            if(item.id === id) {
                item.soLuong ++;
                checkAddCart = false;
                break;
            }
        }
        if(checkAddCart) {
            req.session.idCart.push({
                id: id,
                soLuong: 1
            });    
        }
    }
    console.log(req.session);
    var urlHeader = req.headers.referer;
    var url = urlHeader.replace("http://localhost:3000", "");
    res.redirect(url);
})


router.get('/admin', async function(req, res) {
    let listPro = await modelProduct.listJoin();
    res.render('index-admin.ejs', {listPro: listPro, session: req.session});
})

router.get('/admin-size', async function(req, res) {
    let listSize = await modelSize.list();
    res.render('index-admin-size.ejs', {listSize: listSize, session: req.session});
})

router.get('/admin-color', async function(req, res) {
    let listColor = await modelColor.list();
    res.render('index-admin-color.ejs', {listColor: listColor, session: req.session});
})

router.get('/admin-category', async function(req, res) {
    let listCat = await modelCatalog.list();
    res.render('index-admin-category.ejs', {listCat: listCat, session: req.session});
})


router.get('/delete-project', async function(req, res) {
    let id = req.query.id;
    let product = await modelProduct.DeleteProductById(id);
    res.redirect("/admin");
})

router.get('/delete-size', async function(req, res) {
    let id = req.query.id;
    let product = await modelSize.Delete(id);
    res.redirect("/admin-size");
})

router.get('/delete-category', async function(req, res) {
    let id = req.query.id;
    let product = await modelCatalog.Delete(id);
    res.redirect("/admin-category");
})

router.get('/delete-color', async function(req, res) {
    let id = req.query.id;
    let product = await modelColor.Delete(id);
    res.redirect("/admin-color");
})

router.get('/add-size',async (req, res) => {
    let project = [];
    if(req.query.id !== undefined) {
        project = await modelSize.getSizeById(req.query.id);
        project[0].url = `/update-size?id=${req.query.id}`;
        project[0].nameButton = "Update";
    } else {
        project.push({
            name: ""
        })
        project[0].url = "/add-size";
        project[0].nameButton = "Save";
    }
    res.render('add-size-color-category.ejs', {session: req.session, project: project[0]})
})

router.get('/add-category',async (req, res) => {
    let project = [];
    if(req.query.id !== undefined) {
        project = await modelCatalog.getById(req.query.id);
        project[0].url = `/update-category?id=${req.query.id}`;
        project[0].nameButton = "Update";
    } else {
        project.push({
            name: ""
        })
        project[0].url = "/add-category";
        project[0].nameButton = "Save";
    }
    res.render('add-size-color-category.ejs', {session: req.session, project: project[0]})
})

router.get('/add-color',async (req, res) => {
    let project = [];
    if(req.query.id !== undefined) {
        project = await modelColor.getById(req.query.id);
        project[0].url = `/update-color?id=${req.query.id}`;
        project[0].nameButton = "Update";
    } else {
        project.push({
            name: ""
        })
        project[0].url = "/add-color";
        project[0].nameButton = "Save";
    }
    res.render('add-size-color-category.ejs', {session: req.session, project: project[0]})
})

router.post('/add-size', async function(req, res) {

    let name = req.body.name;
    let id = Date.now().toString();

    let data = {
        id: id,
        name: name
    }

    let query = await modelSize.create(data);
    res.redirect("/admin-size");
})

router.post('/add-color', async function(req, res) {

    let name = req.body.name;
    let id = Date.now().toString();

    let data = {
        id: id,
        name: name
    }

    let query = await modelColor.create(data);
    res.redirect("/admin-color");
})

router.post('/add-category', async function(req, res) {

    let name = req.body.name;
    let id = Date.now().toString();

    let data = {
        id: id,
        name: name
    }

    let query = await modelCatalog.create(data);
    res.redirect("/admin-category");
})

router.post('/update-size', async function(req, res) {

    let name = req.body.name;
    let id = req.query.id;

    let data = {
        id: id,
        name: name
    }

    let query = await modelSize.update(data);
    res.redirect("/admin-size");
})

router.post('/update-color', async function(req, res) {

    let name = req.body.name;
    let id = req.query.id;

    let data = {
        id: id,
        name: name
    }

    let query = await modelColor.update(data);
    res.redirect("/admin-color");
})

router.post('/update-category', async function(req, res) {

    let name = req.body.name;
    let id = req.query.id;

    let data = {
        id: id,
        name: name
    }

    let query = await modelCatalog.update(data);
    res.redirect("/admin-category");
})

router.get('/add-project',async (req, res) => {
    let project = [];
    if(req.query.id !== undefined) {
        project = await modelProduct.getProductById(req.query.id);
        project[0].url = `/update-project?id=${req.query.id}`;
        project[0].nameButton = "Update";
    } else {
        project.push({
            name: "",
            price: 0,
            description: "",
            Size_id: 1,
            Category_id: 1,
            Color_id: 1
        })
        project[0].url = "/add-project";
        project[0].nameButton = "Save";
    }
    
    let listCat = await modelCatalog.list();
    let listColor = await modelColor.list();
    let listSize = await modelSize.list();
    res.render('add-project.ejs', {listCat:listCat, listColor: listColor, listSize: listSize, session: req.session, project: project[0]})
})

router.post('/add-project', async function(req, res) {

    let color = req.body.color;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let size = req.body.size;
    let cat = req.body.cat;
    let img = req.body.img;
    let id = Date.now().toString();

    let data = {
        id: id,
        name: name,
        price: price,
        Category_id: cat,
        Color_id: color,
        description: description,
        img: img,
        Size_id: size
    }

    let query = await modelProduct.createProduct(data);
    res.redirect("/admin");
})

router.post('/update-project', async function(req, res) {

    let color = req.body.color;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let size = req.body.size;
    let cat = req.body.cat;
    let id = req.query.id;
    let img = req.body.img;
    
    let data = {
        idProduct: id,
        name: name,
        price: price,
        idCat: cat,
        idColor: color,
        description: description,
        images: img,
        idSize: size
    }

    let query = await modelProduct.updateProduct(data);
    res.redirect("/admin");
})




module.exports = router;