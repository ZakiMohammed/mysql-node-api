const express = require('express')
const mysql = require('mysql')

const router = express.Router();

router.get('/', (req, res) => {
    const query = 'SELECT * FROM post;';
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysqlapi_db'
    });
    connection.connect();
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        res.json(results);
    });
    connection.end();
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM post WHERE id = ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysqlapi_db'
    });
    connection.connect();
    connection.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.json(null);
        }
    });
    connection.end();
});

router.post('/', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    if (!title || !body) {
        res.status(400).json();
    }

    const query = `INSERT INTO post SET ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysqlapi_db'
    });
    connection.connect();
    connection.query(query, req.body, (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        const location = req.protocol + '://' + req.get('host') + req.originalUrl + '/' +results.insertId;
        res.setHeader('Location', location);
        res.status(201).json();
    });
    connection.end();
});

router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const title = req.body.title;
    const body = req.body.body;

    if (id !== +req.body.id) {
        res.status(400).json();
    }
    if (!title || !body) {
        res.status(400).json();
    }

    const query = `UPDATE post SET title = ?, body = ? WHERE id = ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysqlapi_db'
    });
    connection.connect();
    connection.query(query, [title, body, id], (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        if (results.affectedRows === 0) {
            res.status(404).json();
        } else {
            res.json(req.body);
        }
    });
    connection.end();
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM post WHERE id = ?;`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mysqlapi_db'
    });
    connection.connect();
    connection.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json(error);
        }
        if (results.affectedRows === 0) {
            res.status(404).json();
        } else {
            res.json();
        }
    });
    connection.end();
});

module.exports = router;