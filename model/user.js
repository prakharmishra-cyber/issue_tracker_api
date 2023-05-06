const Mongoose = require("mongoose");
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
  },
  address: {
    type: Object,
    default: {}
  },
  userDetails: {
    type: Object,
    default: {}
  }
})

UserSchema.plugin(mongoosePaginate);

const User = Mongoose.model("user", UserSchema)
module.exports = User