import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Dashboard, EditorEasy, EditorMedium, EditorHard } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/dashboard" exact component={() => <Dashboard />} />
          <Route path="/editoreasy" exact component={() => <EditorEasy />} />
          <Route path="/editormedium" exact component={() => <EditorMedium />} />
          <Route path="/editorhard" exact component={() => <EditorHard />} />
        </Switch>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
