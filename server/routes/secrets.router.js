const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.isAuthenticated());
    let clearance_level = req.user.clearance_level;
    if(isAuthenticated()) {
        pool.query('SELECT * FROM secret WHERE secrecy_level < $1;', [clearance_level])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
    
});

module.exports = router;