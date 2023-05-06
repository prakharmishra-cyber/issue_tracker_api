const express = require('express');

const {  register, login, forgotPassword, 
         post_an_issue, get_user_issue, post_dislike, 
         post_like, get_user_details, update_address, 
         update_user_details, get_all_issues, update_issue_status
} = require('../controllers/auth');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.post('/get_user_issue', get_user_issue);
router.post('/post_an_issue', post_an_issue);
router.post('/post_like', post_like);
router.post('/post_dislike', post_dislike);
router.post('/get_user_details', get_user_details);
router.post('/update_address', update_address);
router.post('/update_users_details', update_user_details);
router.get('/get_all_issues', get_all_issues);
router.post('/update_issue_status', update_issue_status);


module.exports = router;