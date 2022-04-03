var db = require('./database'); //nhúng model database vào đế kết nối db
var itemCat=[]; // biến để chứa dữ liệu đổ về cho controller
var dataList=[];
var dataListPro=[];

// định nghĩa các hàm để tương tác vào mysql
exports.list = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM color";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}


exports.getById = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM color WHERE id=${id}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.Delete = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM color WHERE id=${id}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}

exports.create = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO color SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
            resolve(d);
        })
    })
}

exports.update = (data) => {
    let sql = `UPDATE color SET 
                name='${data.name}'
                WHERE id=${data.id}`;
    let query = db.query(sql, (err, result) => {
        console.log('Update success');
    });
}