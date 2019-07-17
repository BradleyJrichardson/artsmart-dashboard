import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import OrderDetails from "./components/OrderDetails";

class App extends React.Component {
  state = {
    auth: true
  };

  render() {
    if (this.state.auth) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/order" component={OrderDetails} />
          </Switch>
        </Router>
      );
    } else {
      return null;
    }
  }
}

export default App;
