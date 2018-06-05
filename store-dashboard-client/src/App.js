import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import socketIOClient from 'socket.io-client'
import logo from './assets/images/brand-logo.png';
import './App.css';
import DashboardPage from './components/pages/DashboardPage.jsx'
import LoginPage from './components/pages/LoginPage.jsx'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <div className="brand-logo-container">
            <img src={logo} className="brand-logo" alt="logo" />
          </div>
          <h1 className="App-title">Store Dashboard</h1>
        </header>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/login" exact component={LoginPage} />
      </div>
    );
  }
}

export default App;
