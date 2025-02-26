const express = require("express");
require("dotenv").config();
const users = express.Router();
const db = require("../db/dbConfig");

users.get("/", async (req, res) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

users.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE user_id = $1", [user_id]);
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json({ error: `User Not Found: ${err.message}` });
  }
});

users.post("/", async (req,res)=>{
    const { first_name, last_name, dob, username, email, password_hash} = req.body;
    try {
        const newUser = await db.one("INSERT INTO users (first_name, last_name, dob, username,email, password_hash) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[first_name, last_name, dob,username, email, password_hash])

        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({error: `Error Creating User: ${err.message}`})
    }
})

users.put("/:user_id", async (req,res)=>{
    const { user_id } = req.params;
    const {first_name,last_name,dob,username,email,password_hash} = req.body;
    try {
        const updateUser = await db.one("UPDATE users SET first_name = $1, last_name = $2, dob = $3,username = $4, email = $5, password_hash = $6 WHERE user_id = $7 RETURNING *", [first_name, last_name, dob,username,email, password_hash, user_id])
        res.status(201).json(updateUser)
    } catch (err) {
        res.status(400).json({error: `Error Updating User: ${err.message}`})
    }
})

users.delete("/:user_id", async (req,res)=>{
    const { user_id } = req.params
    try {
        await db.none("DELETE FROM users WHERE user_id = $1", [user_id])
        res.json({ message: "User deleted successfully!"})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = users

