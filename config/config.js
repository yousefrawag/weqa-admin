const mongoose = require("mongoose");

const dbCollection = () => {
  mongoose.connect("mongodb+srv://yousefrawag908:sqzsTTbP70vnjS1z@roha-studio.trd4s.mongodb.net/weqa?retryWrites=true&w=majority").then(() => console.log("Connected"));
};
 
module.exports = dbCollection;
