import express from 'express';
import session from 'express-session';
var router = express.Router();

router.get('/', function(req, res) {
    try {
        res.json(req.session);
    } catch {
        console.log("Error in getting session information: ", error);
        res.status(500).json({status: "error", "error": error}); 
    }
});

export default router;