var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bookShop');
var BookSchema=new mongoose.Schema({
    bookName:String,
    bookCover:String,
    bookPrice:Number
},{collection:'books'});
exports.Books=mongoose.model('Books',BookSchema);