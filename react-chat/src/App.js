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
      onDrawNotif: UserActions.drawNotif,

      onLoadChat: ChatActions.loadChat,
      onAddChat: ChatActions.addChat,
      onDrawAddChat: ChatActions.drawAddChat,
      onResendChat: ChatActions.resendChat,
      onDeleteChat: ChatActions.deleteChat,
      onReadChat: ChatActions.readChat
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

      socket.on("comingchat", data => {
        this.state.onDrawAddChat(data.id, "receiver", data.content)
        this.state.onDrawNotif(data)
      })

      socket.on("deletechat", data => {
        this.state.onDeleteChat(data.id, data.sender, data.receiver)
      })
    });
  }

  setRoom = (room) => {
    this.setState({ room })
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ChatBox {...this.state} socket={socket} room={this.state.room} setroom={this.setRoom} />} strict />
          <Route path="/login" element={<ChatLogin />} strict />
        </Routes>
      </Router>
    )
  }
}

export default Container.create(convert(App));