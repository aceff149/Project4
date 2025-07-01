import mysql from 'mysql2/promise';

const db =  await mysql.createConnection ( {
  host: 'localhost',
  user: 'root',
  password: 'ACEXW17',
  database: 'qanswer'
})

db.connect ((err)=> {
  if (err) {
    console.log ("Error on DB connect:", err)
    return;
  } else
    console.log ("Connected to School DB")
})

export default db;
