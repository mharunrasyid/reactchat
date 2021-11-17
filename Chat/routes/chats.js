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
            read: false,
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

router.put('/read', helpers.isLoggedIn, async function (req, res, next) {
    const { sender, receiver } = req.body;
    try {
        const receiverChat = await User.findOne({ username: receiver });

        receiverChat.chat[sender] = [...(receiverChat.chat[sender] ? receiverChat.chat[sender] : [])].map(item => {
            item.read = true;
            return item;
        });

        receiverChat.markModified('chat');
        receiverChat.save();

        let data =  receiverChat.chat[sender];

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.put('/delete', helpers.isLoggedIn, async function (req, res, next) {
    const { id, sender, receiver } = req.body;
    try {
        const senderChat = await User.findOne({ username: sender });

        senderChat.chat[receiver] = [...(senderChat.chat[receiver] ? senderChat.chat[receiver] : [])].filter(item => {
            return item.id != id
        });

        senderChat.markModified('chat');
        senderChat.save();

        let data = senderChat.chat[receiver]
        res.json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;
