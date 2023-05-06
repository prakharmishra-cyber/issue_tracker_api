const Mongoose = require("mongoose");

const IssueSchema = new Mongoose.Schema({
    mobno: {
      type: String,
      required: true,
    },
    issue_image: {
        type: Buffer,
        required: true
    },
    issue_description: {
        type: String,
        required: true
    },
    issue_title: {
        type: String,
        required: true
    },
    selectedDepartment: {
        type: Object,
        default: {}
    },
    marker_pos: {
        type: Object,
        default: {}
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    posted_on : {
        type: Date
    }, 
    city_name: {
        type: String,
        required: true
    },
    issue_status: {
        type:Array,
        default:[]
    }
  });
  
  
  const Issue = Mongoose.model("issue", IssueSchema)
  module.exports = Issue