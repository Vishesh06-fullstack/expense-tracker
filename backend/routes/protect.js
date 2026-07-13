const express = require("express");
const requiredPath = require("../middleware/auth");
const router = express.Router();

router.get('/' , requiredPath , (req , res) => {
    res.status(200).json({message : "Protected routes successfully"});
});

module.exports = router;