var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", (req, res) => {
  let data = req.body;
  console.log(data);
  let str = JSON.stringify(data);
  res.send(str);
});

module.exports = router;
