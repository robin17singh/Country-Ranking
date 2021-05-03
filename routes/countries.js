var express = require('express');
var router = express.Router();
const fs = require("fs");
var data = require("../data/data.json");
const multer = require('multer');
var file = "./data/data.json";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express',
    name: 'Robin',
    data: req.data
  });
});


// Add New Country Routes
router.get('/countries', (req, res) => {
  res.render('countries')
})

router.post("/countries", upload.single('flag'), async (req, res) => {
  let formData = {
    name: req.body.name,
    continent: req.body.continent,
    flag: "images/" + req.body.flag,
    rank: req.body.rank
  };
  try {

    let rawdata = fs.readFileSync(file);
    var jsonBook = JSON.parse(rawdata);

    let formDataParsed = JSON.stringify(formData, null, 2);
    jsonBookNew = { ...formDataParsed, ...jsonBook }
    let parsed = JSON.stringify(jsonBookNew, null, 2);
    fs.writeFile("./data/data.json", parsed, (err) => {
      if (err) throw err;
      req.flash("success", "saved details");
    });
    res.redirect("/countries");
  } catch (error) {
    console.error("/countries route error : ", error);
  }
});

router.get('/countries/new', (req, res) => {
  res.render('new')
})

module.exports = router;