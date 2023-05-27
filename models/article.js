const mongoose = require('mongoose');
 
const articleSchema = mongoose.Schema({
    type: String,
    brand: String,
    model: String,
    label: String,
    price: Number,
    img: Array,
    description: String,
    ref: String,
});

const Article = mongoose.model("articles", articleSchema);
 
module.exports = Article;