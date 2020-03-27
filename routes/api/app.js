// const express = require("express");
// const router = express.Router();
// // Load input validation
// const validateRegisterInput = require("../../validation/register");
// // Load User model
// const App = require("../../models/App");
// // @route POST api/users/register
// // @desc Register user
// // @access Public
// router.post("/register", (req, res) => {
//     App.findOne({isRegister: req.body.isRegister}).then(app => {
//         if(app) {
//             return res.status(400).json({
//                 "success": "false",
//                 "register": "false"
//             })
//         } else {
//             new App({
//                 isRegister: req.body.isRegister
//             })
//         }
//     })
//     //return res.status(200).json({
//     //    "success": "true",
//     //    "register": "success"
//     //})
// })
// module.exports = router;