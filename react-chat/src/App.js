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

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ChatBox />} strict />
//         <Route path="/login" element={<ChatLogin />} strict />
//       </Routes>
//     </Router>
//   )
// }

class App extends Component {
  static getStores() {
    return [
      UserStore
    ]
  }

  static calculateState(prevState) {
    return {
      users : UserStore.getState(),

      onLoad: UserActions.loadUser,
      onLogout: UserActions.logoutUser,
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