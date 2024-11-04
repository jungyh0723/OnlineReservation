const express = require('express');
const app = express();
const path = require('path');

// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');
const { Schema } = mongoose;
// 2. testDB 세팅
mongoose.connect('mongodb+srv://jungjyh0723:k3nX0ZV6jW3WPW6D@mdionlinedb.xrskh.mongodb.net/Reservation');
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});
const rsInfo = new Schema({
    sName: String,
    sNum: Number,
    pNum: String,
    pDate: String,
    sMenu: {
        fruit: Number,
        sandwhich: Number,
        lemonade: Number
    },
    prepared: Boolean,
    served: Boolean
})

const pInfo = mongoose.model('reserve', rsInfo);


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.listen(8080, function() {
    console.log('listening on 8080')
});


app.get('/', function(rq, rs) {
    rs.sendFile(__dirname + '/public/main.html');
});

app.get('/reserve', async function(req, res) {
    snum = parseInt(req.query.snum);
    sname = req.query.sname;
    pnum = req.query.pnum;
    menu = req.query.menu;
    date = req.query.date;
    console.log(snum + " / " + sname + " / " + pnum + " / " + menu + " / " + date);
    const reservant = new pInfo();
    reservant.sName = sname;
    reservant.sNum = snum;
    reservant.pNum = pnum;
    reservant.pDate = date;
    reservant.sMenu.fruit = menu[0];
    reservant.sMenu.lemonade = menu[1];
    reservant.sMenu.sandwhich = menu[2];
    reservant.prepared = false;
    reservant.served = false;
    var check1 = (await db.collection("reserve").find({sName: sname}).toArray()).length;
    var check2 = (await db.collection("reserve").find({sNum: snum}).toArray()).length;
    console.log(check1 + "    /    " + check2)
    if(check1 || check2) {
        res.sendFile(__dirname+"/public/done/notTwo.html")
    }
    else {
        await db.collection("reserve").insertOne(reservant)
        const rInfo = await db.collection("reserve").find({sName: sname}).toArray()
         // 조회된 데이터의 _id 필드만 추출하기
        const ids = rInfo.map(data => data._id);
        console.log(ids[0].toString());
        res.sendFile(__dirname+"/public/done/done.html")
    }
});

app.get('/reserve/all', async function(req, res) {
    try {
        const reservations = await db.collection("reserve").find({}).toArray();
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve reservations' });
    }
});

app.delete('/api/delete', async function(req, res) {
    try {
        nu = parseInt(req.query.sNum);
        console.log(nu)
        const result = await db.collection("reserve").deleteOne({sNum : nu})
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
    }
        res.status(200).json({ message: "데이터가 삭제되었습니다." });
    } catch (error) {
        res.status(500).json({ error: "데이터를 삭제하는 데 오류 발생" });
    }
   
});

app.post('/api/prepare', async function(req, res) {
    try {
        num = parseInt(req.query.sNum);
        const result = await db.collection("reserve").updateOne({sNum: num}, { $set: {prepared: true}});
        return res.status(200).json({message: "처리되었습니다."});
    } catch (error) {
        return res.status(500).json({error: "오류발생"});
    }
});

app.post('/api/serve', async function(req, res) {
    try {
        num = parseInt(req.query.sNum);
        const result = await db.collection("reserve").updateOne({sNum: num}, { $set: {served: true}});
        return res.status(200).json({message: "처리되었습니다."});
    } catch (error) {
        return res.status(500).json({error: "오류발생"});
    }
});

app.get('/mdiyh', function(req, res) {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});