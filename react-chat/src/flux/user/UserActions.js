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

    loadUser() {
        request.get('users', { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then((users) => {
            request.get('users/token', { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then((user) => {
                Actions.drawUser(users.data.filter(item => item.username !== user.data.username))
            }).catch((err) => {
                throw err
            })
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