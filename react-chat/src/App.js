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
  static getStores() {
    return [
      UserStore,
      ChatStore
    ]
  }

  static calculateState(prevState) {
    return {
      users : UserStore.getState(),
      chats: ChatStore.getState(),

      onLoad: UserActions.loadUser,
      onLogout: UserActions.logoutUser,

      onLoadChat: ChatActions.loadChat,
      onAddChat: ChatActions.addChat,
      onResendChat: ChatActions.resendChat,
    }
  }

  render(){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ChatBox {...this.state} />} strict /> 
          <Route path="/login" element={<ChatLogin />} strict />
        </Routes>
      </Router>
    )
  }
}

export default Container.create(convert(App));