import mysql from 'mysql2/promise';

const db =  await mysql.createConnection ( {
  host: 'localhost',
  user: 'root',
  password: 'Always918!',
  database: 'qanswer'
})

db.connect ((err)=> {
  if (err) {
    console.log ("Error on DB connect:", err)
    return;
  } else
    console.log ("Connected to qanswer DB")
})

export default db;
