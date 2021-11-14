var express = require('express');
var router = express.Router();
var User = require("../model/user")
var jwt = require("jsonwebtoken");

const helpers = require("../helpers/util");

/* GET users listing. */
router.get('/', helpers.isLoggedIn, async function (req, res, next) {
  try {
    const users = await User.find({});
    console.log(users);
    res.json(users)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });

    console.log(req.body);
    if (!user) {
      var token = jwt.sign(
        {
          username: req.body.username,
        },
        "shhhhh"
      );

      req.body.token = token;

      const newUser = await User.create(req.body);

      let dataAll = {
        data: {
          username: req.body.username,
          chat: {}
        },
        token,
      };

      res.json(dataAll);
    } else {
      var token = jwt.sign(
        {
          username: user.username,
        },
        "shhhhh"
      );
      
      let dataAll = {
        data: {
          username: user.username,
          chat: user.chat,
        },
        token,
      };

      req.body.token = token;

      const userEdit = await User.findByIdAndUpdate(
        user._id,
        {
          token: req.body.token,
        },
        {
          new: true,
        }
      );
  
      res.json(dataAll);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/destroy", helpers.isLoggedIn, async (req, res) => {
  try {
    let token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOneAndUpdate(
      { token },
      {
        token: null,
      },
      {
        new: true,
      }
    );

    res.json({ logout: true });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/token", helpers.isLoggedIn, async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.userToken.username });

    dataUser = {
      _id: user._id,
      username: user.username
    }

    res.json(dataUser);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
