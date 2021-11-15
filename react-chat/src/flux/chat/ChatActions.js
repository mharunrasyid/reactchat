import dispatcher from "../Dispatcher";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"


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

    drawAddChat(id, content) {
        dispatcher.dispatch({
            type: "DRAW_ADD_CHAT",
            id,
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

    addChat(receiver, content) {
        const id = uuidv4()

        Actions.drawAddChat(id, content)
        request.post('chats', { sender: localStorage.getItem("username"), receiver, content }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }).then((chat) => {
            Actions.successAddChat(chat)
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

    resendChat(id, receiver, content) {
        request.post('chats', { sender: localStorage.getItem("username"), receiver, content }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }).then((chat) => {
            Actions.successResendChat(id)
        }).catch((err) => {
            Actions.failedResendAddChat(id)
            throw err
        })
    },
}

export default Actions;