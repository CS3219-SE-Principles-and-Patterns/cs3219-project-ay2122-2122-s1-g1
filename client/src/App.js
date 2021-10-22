import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Editor from "./components/Editor";

// import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route path="/login" exact component={() => <Login />} />
              <Route path="/dashboard" exact component={() => <Dashboard />} />
              <Route path="/editor" exact component={() => <Editor />} />
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
