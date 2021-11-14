import dispatcher from "./Dispatcher";
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
            Actions.drawUser(users.data)
        }).catch((err) => {
            throw err
        })
    },

    logoutUser() {
        request.get("users/destroy", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
            localStorage.removeItem("token");
        }).catch((err) => {
            throw err;
        })
    }
}

export default Actions;