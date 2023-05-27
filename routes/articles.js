var express = require("express");
var router = express.Router();
const Article = require("../models/article");

//show all data
router.get("/", async (req, res) => {
  let AllArticles = await Article.find();
  res.send(AllArticles);
});


// search all articles from same type
router.get("/:typeSearch", async (req, res) => {
  const { typeSearch } = req.params;

  let typeResult = await Article.find({
    type: { $regex: typeSearch, $options: "i" },
  });

  // no result found
  if (!typeResult.length) {
    res.json({
      result: false,
      message: `no result `,
    });
    return;
  }
  // result found
  res.json({
    result: true,
    typeResult,
  });
});




// search article by word in label
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  // find is not sensible to case
  let searchResult = await Article.find({
    label: { $regex: ".*" + search.toLowerCase() + ".*", $options: "i" },
  });

  // no result found
  if (!searchResult.length) {
    res.json({
      result: false,
      message: `no result`,
    });
    return;
  }
  // result found
  res.json({
    result: true,
    searchResult,
  });
});



// Get Article by reference
router.get("/:ref", async (req, res) => {
  const { reference } = req.params;

  // find article by ref
  const refResult = await Article.findOne({ ref });

  // no result found
  if (!searchResult) {
    res.json({
      result: false,
      refResult,
      message: `no result`,
    });
    return;
  }

  // result found
  res.json({
    result: true,
    refResult,
  });
});


// adding  a new article
router.post("/addArticle", async (req, res) => {

  const { type, brand, model, label, price, img, description, reference } =
    req.body;

  const newArticle = new Article({
    type,
    brand,
    model,
    label,
    price,
    img,
    description,
    ref,
  });

  newArticle.save().then(
    res.json({
      result: true,
      newArticle,
    })
  );
});

module.exports = router;
