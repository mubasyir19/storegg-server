var express = require('express');
var router = express.Router();
const { viewSignin, actionSignin, actionlogout, actionLogout } = require('./controller');

router.get('/', viewSignin);
router.post('/', actionSignin);
router.get('/logout', actionLogout);


module.exports = router;
