const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
});

module.exports= mongoose.model('users',userSchema);
