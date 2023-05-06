const User = require("../model/user");
const axios = require('axios');
const Issue = require('../model/Issue');

exports.get_user_issue = async (req, res) => {
  const data = await Issue.find({
    "mobno": req.body.mobno
  });
  try {
    res.status(200).json(
      data
    );
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong'
    });

  }
}

exports.post_an_issue = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await Issue.create(data).then(async (issue_data) => {
      await User.updateOne({ mobno: data.mobno }, {
        $push: {
          issues_posted: issue_data._id
        }
      })
    }).then(() => {
      res.status(200).json({ message: 'Issue Posted Successfully' });
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messaage: 'Something went wrong!'
    });
  }
}

exports.login = async (req, res) => {
  const { mobno, pwd } = req.body
  if (!mobno || !pwd) {
    res.status(400).json({
      message: "Username or Password not present",
    })
  } else {
    try {
      const data = await User.findOne({ mobno: mobno, pwd: pwd }).then(response => {
        return response;
      });
      res.status(200).json({
        message: 'Logged In Successfully',
        user_details: data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Something went wrong',
        error: error
      });
    }
  }
}

exports.register = async (req, res) => {
  const { mobno, pwd } = req.body;
  await User.findOne({ "mobno": mobno }).then(async (responses) => {
    if (responses) {
      return res.status(200).json({ message: 'Mobile Number already registered!' });
    } else {
      if (pwd.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
      }
      try {
        await User.create({
          mobno,
          pwd,
          time: new Date(),
          issues_posted: []
        }).then((user) =>
          res.status(200).json({
            message: "User successfully created",
            user
          })
        )
      } catch (err) {
        console.log(err);
        res.status(401).json({
          message: "User not successful created",
          error: err,
        })
      }
    }
  });


}

exports.forgotPassword = async (req, res) => {
  const { mobno } = req.body;
  try {
    const data = await User.findOne({ mobno: mobno }).
      then(async (response) => {
        await axios.get(`http://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&route=q&message=Your Password is ${response.pwd}. Please Reset Immediately&language=english&flash=0&numbers=${mobno}`)
          .then((response) => {
            //console.log(response);
            res.status(200).json({ message: 'Check Message Inbox for password' });
          })
          .catch(error => console.log(error));
      });
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: 'Something went wrong!',
      error: error
    })
  }
}

exports.post_like = async (req, res) => {
  const { issue_id } = req.body;

  try {
    await Issue.findByIdAndUpdate(issue_id, {
      $inc: {
        likes: 1
      }
    }).then(() => {
      res.status(200).json({ message: 'like posted successfully' });
    })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!' });
  }
}

exports.post_dislike = async (req, res) => {
  const { issue_id } = req.body;
  try {
    await Issue.findByIdAndUpdate(issue_id, {
      $inc: {
        dislikes: 1
      }
    }).then(() => {
      res.status(200).json({ message: 'dislike posted successfully' });
    })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!' });
  }
}

exports.get_user_details = async (req, res) => {
  const { user_id } = req.body;
  try {
    const response = await User.findById(user_id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({
      messaage: 'Something went wrong'
    });
  }
}

exports.update_address = async(req, res) => {
  const {user_address , user_id} = req.body;
  try {
    await User.findByIdAndUpdate(user_id, {
      $set: {
        address: user_address
      }
    }).then(()=>{
      res.status(200).json({ message: 'Address Updated Successfully' });
    })
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong'
    });
  }
}

exports.update_user_details= async(req, res) => {
  const {user_details , user_id} = req.body;
  try {
    await User.findByIdAndUpdate(user_id, {
      $set: {
          userDetails: user_details
      }
    }).then(()=>{
      res.status(200).json({ message: 'User Details Updated Successfully' });
    })
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong'
    });
  }
}

exports.get_all_issues = async(req, res) => {
  try {
    const resp = await Issue.find({}).then(data=>data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({
      messaage:'Someting got wrong'
    })
  }
}

exports.update_issue_status = async ( req, res ) => {
  const {issue_id, label, description} = req.body;
  console.log(req.body);
  try {
    await Issue.findByIdAndUpdate(issue_id, {
      $push: {
        issue_status: {
          label, description
        }
      }
    }).then(()=>{
      res.status(200).json({
        message:'Status Updated Successfully'
      })
    })
  } catch (error) {
    res.status(400).json({
      message:'Something went wrong'
    })
  }
} 