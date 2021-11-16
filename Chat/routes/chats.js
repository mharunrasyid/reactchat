var express = require('express');
var router = express.Router();
var User = require("../model/user")

const helpers = require("../helpers/util");

/* GET users listing. */

router.get('/', helpers.isLoggedIn, async function (req, res, next) {
    const { sender, receiver } = req.query;

    try {
        const senderChat = await User.findOne({ username: sender });
        const receiverChat = await User.findOne({ username: receiver });

        const chats = [...(senderChat?.chat[receiver] || []).map(item => {
            item.role = "sender"
            return item
        }), ...(receiverChat?.chat[sender] || []).map(item => {
            item.role = "receiver"
            return item
        })].sort((a, b) => a.chatdate - b.chatdate)

        res.json(chats)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/', helpers.isLoggedIn, async function (req, res, next) {
    const { id, sender, receiver, content } = req.body;
    try {
        const user = await User.findOne({ username: sender })

        user.chat[receiver] = [...(user.chat[receiver] ? user.chat[receiver] : []), {
            id,
            content,
            chatdate: new Date()
        }];

        user.markModified('chat');
        user.save()

        let data = user.chat[receiver][user.chat[receiver].length - 1]

        res.json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get('/delete', helpers.isLoggedIn, async function (req, res, next) {
    const { id, sender, receiver } = req.query;

    try {
        const senderChat = await User.findOne({ username: sender });
        const receiverChat = await User.findOne({ username: receiver });

        const chats = [...(senderChat?.chat[receiver] || []).filter(item => {
            item.role = "sender";
            return item.id != id
        }), ...(receiverChat?.chat[sender] || []).filter(item => {
            item.role = "receiver";
            return item.id != id
        })].sort((a, b) => a.chatdate - b.chatdate)

        res.json(chats)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;
