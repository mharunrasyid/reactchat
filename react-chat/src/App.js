import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Container } from "flux/utils";
import UserStore from "./flux/user/UserStore";
import UserActions from "./flux/user/UserActions"
import { Component } from "react";

import ChatStore from "./flux/chat/ChatStore";
import ChatActions from "./flux/chat/ChatActions"

import ChatBox from './components/ChatBox';
import ChatLogin from './components/ChatLogin'
import './style.css';

import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");

const convert = function (containerClass) {
  const tmp = containerClass;
  containerClass = function (...args) {
    return new tmp(...args)
  }

  containerClass.prototype = tmp.prototype;
  containerClass.getStores = tmp.getStores;
  containerClass.calculateState = tmp.calculateState;
  return containerClass;
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = ({ room: '' })
  }
  
  static getStores() {
    return [
      UserStore,
      ChatStore
    ]
  }

  static calculateState(prevState) {
    return {
      users: UserStore.getState(),
      chats: ChatStore.getState(),

      onLoad: UserActions.loadUser,
      onLogout: UserActions.logoutUser,

      onLoadChat: ChatActions.loadChat,
      onAddChat: ChatActions.addChat,
      onDrawAddChat: ChatActions.drawAddChat,
      onResendChat: ChatActions.resendChat,
    }
  }

  componentDidMount() {
    socket.on("connect", () => {
      socket.on("invite", ({ receiver, room }) => {
        if (localStorage.getItem("username") === receiver) {
          socket.emit("join", room)
          this.setState(({ room }))
        }
      })

      socket.on("commingchat", data => {
        this.state.onDrawAddChat(data.id, "receiver", data.content)
      })
    });
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ChatBox {...this.state} socket={socket} room={this.state.room} />} strict />
          <Route path="/login" element={<ChatLogin />} strict />
        </Routes>
      </Router>
    )
  }
}

export default Container.create(convert(App));