var db = require('./database'); //nhúng model database vào đế kết nối db
var dataList=[]; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];

// định nghĩa các hàm để tương tác vào mysql
exports.list = () => {
    // let sql = "SELECT * FROM product";
    // let query = db.query(sql, (err, result) => {
    //     console.log('List success');
    //     dataList = result;
    // })
    // return dataList;

    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM product";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}

exports.create = (name, shortDesc, images, description, dateUpdate, price, author, idCat, showHide) => {
    let data = {
        name: name,
        shortDesc: shortDesc,
        images: images,
        description: description,
        dateUpdate: dateUpdate,
        price: price,
        author: author,
        idCat: idCat,
        showHide: showHide,
    };
    let sql = "INSERT INTO products SET ?";
    let query = db.query(sql, data, (err, result) => {
        console.log('Create success');
    });
}

exports.update = (idProduct, name, shortDesc, images, description, dateUpdate, price, author, idCat, showHide) => {
    let sql = `UPDATE products SET 
                name='${name}', 
                shortDesc='${shortDesc}', 
                images='${images}',
                description='${description}',
                dateUpdate='${dateUpdate}',
                price='${price}',
                author='${author}',
                idCat='${idCat}',
                showHide='${showHide}',
                WHERE idProduct=${idProduct}`;
    let query = db.query(sql, (err, result) => {
        console.log('Update success');
    });
}

exports.delete = idProduct => {
    let sql = `DELETE FROM products WHERE idProduct=${idProduct}`;
    let query = db.query(sql, (err, result) => {
        console.log('Delete success');
    })
}

exports.getProductById = (idProduct) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM product WHERE id=${idProduct}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.getProductByCategory = (idCategory) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM product WHERE Category_id=${idCategory}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.getProductByColor = (idColor) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM product WHERE Color_id=${idColor}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.getProductBySize = (idSize) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM product WHERE Size_id=${idSize}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.DeleteProductById = (idProduct) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM product WHERE id=${idProduct}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.createProduct = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO product SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
            resolve(d);
        })
    })
}

exports.updateProduct = (data) => {
    let sql = `UPDATE product SET 
                name='${data.name}', 
                Size_id='${data.idSize}', 
                img='${data.images}',
                description='${data.description}',
                price='${data.price}',
                Color_id='${data.idColor}',
                Category_id='${data.idCat}'
                WHERE id=${data.idProduct}`;
    let query = db.query(sql, (err, result) => {
        console.log('Update success');
    });
}

exports.listInId = (ids) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM product WHERE id in ${ids}`;
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}

exports.listJoin = () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT p.*, c.name as "color", s.name as 'size', ca.name as 'category' 
        FROM product p
        LEFT JOIN color c ON c.id = p.Color_id
        LEFT JOIN size s ON s.id = p.Size_id
        LEFT JOIN category ca ON ca.id = p.Category_id`;
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}