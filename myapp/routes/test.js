const express = require("express");
const router = express.Router();
const db = require("../lib/db");

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("용진사랑");
});

// 데이터로 연도, 학과 보내면 그에 맞는 시간표
router.post("/lecture", (req, res) => {
  year = req.body.year;
  major = req.body.major;

  console.log(req.body);
  let query = `SELECT * FROM subj_${year} WHERE major like '%${major}%'`;
  db.query(query, (err, data) => {
    if (err) console.error(err);
    console.log(typeof data);
    res.json(data);
  });
});

module.exports = router;
