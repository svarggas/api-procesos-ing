const router = require("express").Router();
const User = require("../model/User");

const { authenticateToken } = require("../utils/general");

router.get("/get/:user", authenticateToken, async (req, res) => {

    console.log(req)
    //Validating data
    let searchQuery = {}
    if (req.params.user !== 'all') searchQuery = { "user": req.params.user }

    try {

        const users = await User.find(searchQuery)
        !users ?
            res.status(404).send("No functionaries found") :
            res.status(200).send({ 
                msg: "User(s) found",
                data: users
            });

    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
});

module.exports = router;