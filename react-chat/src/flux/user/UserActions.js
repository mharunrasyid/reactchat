import dispatcher from "../Dispatcher";
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

const Actions = {
    drawUser(users) {
        dispatcher.dispatch({
            type: "DRAW_USER",
            users
        })
    },

    drawNotif(data) {
        dispatcher.dispatch({
            type: "DRAW_NOTIF",
            data
        })
    },

    loadUser() {
        request.get(`users/notif/${localStorage.getItem("username")}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then((users) => {
            Actions.drawUser(users.data)
        }).catch((err) => {
            throw err
        })
    },

    logoutUser() {
        request.get("users/destroy", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }).catch((err) => {
            throw err;
        })
    }
}

export default Actions;