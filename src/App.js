import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";

class App extends React.Component {
  state = {
    auth: true
  };

  render() {
    if (this.state.auth) {
      return <Dashboard />;
    } else {
      return null;
    }
  }
}

export default App;
