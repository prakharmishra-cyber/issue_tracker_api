const Mongoose = require("mongoose");
const Plan = require('./plan');
const Bank = require('./bank');
const mongoosePaginate = require('mongoose-paginate-v2');


const UserSchema = new Mongoose.Schema({
  mobno: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    minlength: 6,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  issues_posted: {
    type: Array,
    default: []
  }
})

UserSchema.plugin(mongoosePaginate);

const User = Mongoose.model("user", UserSchema)
module.exports = User