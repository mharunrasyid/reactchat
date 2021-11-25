import dispatcher from "../Dispatcher";
import UserActions from "../user/UserActions"
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

const Actions = {
    drawChat(chats) {
        dispatcher.dispatch({
            type: "DRAW_CHAT",
            chats
        })
    },

    loadChat(receiver) {
        request.get('chats', {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            params: {
                sender: localStorage.getItem("username"),
                receiver
            }
        }).then((chats) => {
            Actions.drawChat(chats.data)
        }).catch((err) => {
            throw err
        })
    },

    drawAddChat(id, role, content) {
        dispatcher.dispatch({
            type: "DRAW_ADD_CHAT",
            id,
            role,
            content
        })
    },

    successAddChat(chat) {
        dispatcher.dispatch({
            type: "SUCCESS_ADD_CHAT",
            chat
        })
    },

    failedAddChat(id, content) {
        dispatcher.dispatch({
            type: "FAILED_ADD_CHAT",
            id,
            content
        })
    },

    addChat(id, receiver, content, cb) {
        Actions.drawAddChat(id, "sender", content)
        request.post('chats', { id, sender: localStorage.getItem("username"), receiver, content }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }).then((chat) => {
            Actions.successAddChat(chat)
            cb()
        }).catch((err) => {
            Actions.failedAddChat(id, content)
            throw err
        })
    },

    successResendChat(id) {
        dispatcher.dispatch({
            type: "SUCCESS_RESEND_CHAT",
            id
        })
    },

    failedResendAddChat(id) {
        dispatcher.dispatch({
            type: "FAILED_RESEND_CHAT",
            id
        })
    },

    resendChat(id, receiver, content, cb) {
        request.post('chats', { id, sender: localStorage.getItem("username"), receiver, content }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
            Actions.successResendChat(id)
            cb()
        }).catch((err) => {
            Actions.failedResendAddChat(id)
            throw err
        })
    },

    successDeleteChat(id) {
        dispatcher.dispatch({
            type: "SUCCESS_DELETE_CHAT",
            id
        })
    },

    failedDeleteAddChat(id) {
        dispatcher.dispatch({
            type: "FAILED_DELETE_CHAT",
            id
        })
    },

    deleteChat(id, sender, receiver) {
        request.put('chats/delete', { id, sender, receiver }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
            Actions.successDeleteChat(id)
        }).catch((err) => {
            Actions.failedDeleteAddChat(id)
            throw err
        })
    },

    readChat(sender, receiver) {
        request.put('chats/read', { sender, receiver }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
            Actions.loadChat(receiver);
            UserActions.loadUser()
        }).catch((err) => {
            throw err
        })
    },
}

export default Actions;