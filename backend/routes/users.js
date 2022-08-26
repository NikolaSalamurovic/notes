var express = require('express');
var router = express.Router();
var cors = require("cors")

var mysql = require("mysql2");



var connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "bigtester",
  password: "123456",
  database: "dataserver1"
})

router.post("/add", async (req, res) => {
       try{
         connection.execute(
           `INSERT INTO docs (title, markdown) VALUES (?, ?)`,
           [req.body.title, req.body.markdown],
           (err, result) => {
             if(err){
               return res.json(err);
             }
             console.log(result)
             res.json(result);
           }
         );
       } catch(err){
         console.log(err)
         res.json(err.message);
       }

});

router.get("/", async (req, res) => {
  try{
    connection.execute(`SELECT * FROM docs`, (err, result) =>{
      if(err){
        return res.json(err);
      }
      console.log(result);
      res.json(result);
    })
  } catch(err){
    console.log(err);
    res.json(err.message);
  }
})

router.get("/:id", async (req, res) =>{
  try{
    connection.execute(
      `SELECT * FROM docs WHERE id = ?`,
      [req.params.id],
      (err, result) => {
        if(err) {
          return res.json(err)
        }
        console.log(result);
        res.json(result);
      }
    );
  } catch(err){
    console.log(err)
    res.json(err.message);
  }
})

router.delete("/:id", async (req,res) =>{
  try{
    connection.execute(
      `DELETE FROM docs WHERE id = ?`,
      [req.params.id],
      (err, result) => {
        if(err){
          return res.json(err)
        }
        console.log(result);
        res.json(result);
      }
    )
  } catch(err) {
    console.log(err);
    res.json(err.message);
  }
})

router.put("/:id", async (req,res) => {
  try{
    connection.execute(
      `UPDATE docs SET title = ?, markdown = ? WHERE id = ?`, 
      [req.body.title, req.body.markdown, req.params.id],
      (err, result) =>{
        if(err){
          return res.json(err);
        }
        console.log(result);
        res.json(result)
      } 
    )
  } catch(err){
    console.log(err);
    res.json(err.message)
  }
})

module.exports = router;
router.use(cors())
router.use(express.json())
