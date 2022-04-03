var db = require('./database'); //nhúng model database vào đế kết nối db
var itemCat=[]; // biến để chứa dữ liệu đổ về cho controller
var dataList=[];
var dataListPro=[];

// định nghĩa các hàm để tương tác vào mysql
exports.list = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM category";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}
exports.listByName = async (nameCat) => {

    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM category WHERE name='${nameCat}'`;
        db.query(sql, (err, result) => {
            console.log('Get idCat by nameCat success');
            itemCat = result[0].id;
        })
        let sql2 = `SELECT * FROM product WHERE id=${itemCat}`;
        db.query(sql2, (err, result) => {
            console.log('Get list product by id Cat success');
            dataListPro = result;
            hamOK(dataListPro);
        })
        }
    )
}


exports.getById = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM category WHERE id=${id}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.Delete = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM category WHERE id=${id}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.create = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO category SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
            resolve(d);
        })
    })
}

exports.update = (data) => {
    let sql = `UPDATE category SET 
                name='${data.name}'
                WHERE id=${data.id}`;
    let query = db.query(sql, (err, result) => {
        console.log('Update success');
    });
}