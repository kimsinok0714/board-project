

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
//import { jsonParser } from '../utils/jsonParser.';

const app = express();


const PORT = 5000;
app.listen(PORT, '127.0.0.1', () => {
    console.log('Api server running at http://localhost:', PORT);
});


app.use(cors());

// app.use(jsonParser)
app.use(express.json());


const db = mysql.createConnection({
    host: '172.27.142.70',
    user: 'react',
    password: 'Mysql1234!!',
    port: 3306,
    database: 'db_board'
});


db.connect(err => {
    console.log('error : ', err);

    err ? console.log('db 접속 실패') : console.log('db 접속 성공');
    
});


//라우팅 설정

app.get('/', (req, res) => {
    console.log('call get /');    
    res.send('Hello, Node.js');
});



//게시글 목록조회
app.get('/api/articles', (req, res) => {

    console.log("call app.get('/api/articles')");
    

    const sql = `SELECT id, title, writer, DATE_FORMAT(reg_date, '%Y-%m-%d %H:%i') AS reg_date 
                 FROM article 
                 ORDER BY id`;

    db.query(sql, (err, data) => {
        if (!err) {
            console.log('data : ', data);
            res.json(data);
        } else {
            console.log('error : ', err);
            res.status(500).json({error: 'DB query error'});
        }
    });
});


//게시글 상세 조회
app.get('/api/articles/:id', (req, res) => {

    const id = req.params.id;
    console.log('id : ', id);

    const sql = `SELECT id, title, contents, writer, DATE_FORMAT(reg_date, "%Y-%m-%d %H:%i") AS reg_date
                 FROM article
                 WHERE id = ?`;

    db.query(sql, [id], (err, data) => {
        if (!err) {
            console.log('data : ', data);
            res.json(data);            
        } else {
            console.log('err : ', err);            
            res.status(500).json({error: 'DB query error'});
        }
    });
    
});


//게시글 등록
app.post('/api/articles', (req, res) => {
    const title = req.body.title;
    const writer = req.body.writer;
    const contents = req.body.contents;

    console.log(`title : ${title}, writer : ${writer}, contents : ${contents}`);

    const sql = `INSERT INTO article (title, writer, contents)
                 VALUES (?, ?, ?)`; 

    db.query(sql, [title, writer, contents], (err, data) => {
        if (!err) {
            console.log('data : ', data);
            res.status(201).json({ id: data.insertId });  
        } else {
            res.status(500).json({error: 'DB query error'});
        }
    });

});


//게시글 수정
app.put('/api/articles/:id', (req, res) => {

    const id = req.params.id;
    const title = req.body.title;
    const writer = req.body.writer;
    const contents = req.body.contents;

    const sql = `UPDATE article SET
                    title = ? ,
                    contents = ? ,
                    writer = ?
                 WHERE id = ?`;

    db.query(sql, [title, writer, contents, id], (err, data) => {
        if (!err) {
            res.status(200).json({ msg: 'Article updated successfully' });  
            //res.sendStatus(200);
        } else { 
            console.log('error : ', err);
            
            res.status(500).json({ error: 'DB query error' });  }
    });

});

//게시글 삭제
app.delete('/api/articles/:id', (req, res) => {
    
    const id = req.params.id;

    const sql = `DELETE FROM article WHERE id = ?`;

    db.query(sql, [id], (err, data) => {
        if (!err) {
            res.status(200).json({ msg: 'Article deleted successfully' });
        } else {
            console.log('error : ', err);
            res.status(500).json({ error: 'DB query error' });
        }
    });
});


