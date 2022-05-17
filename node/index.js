const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 5000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const get_sql = 'SELECT * FROM people'
const db = mysql.createConnection(config)


db.connect((err) => {
    if (err) throw err
    
})

const createtable_sql = 'CREATE TABLE people (id integer not null auto_increment, name varchar(255), primary key(id));'
db.query(createtable_sql, (err, result) => {
    if (err) {
        console.log("Erro ao criar database...")
        throw err
    }
    console.log(result)
    let insert_sql = [
        "INSERT INTO people (name) VALUES ('Pedro');",
        "INSERT INTO people (name) VALUES ('Thiago');",
        "INSERT INTO people (name) VALUES ('João');",
        "INSERT INTO people (name) VALUES ('Mateus');",
        "INSERT INTO people (name) VALUES ('Lucas');"
    ]
    insert_sql.forEach(sql => {
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Erro ao inserir dados...")
            }
        })
    })
})

app.get('/', (req, res) => {
    db.query(get_sql, (err, result) => {
        res.send(`<h1>Full Cycle</h1><p>${JSON.stringify(result)}</p>`)
    })
})

app.listen(port, () => {
    console.log('Running over port ' + port)
})