import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import OrderDetails from "./components/OrderDetails";
import CustomerDetails from "./components/CustomerDetails";
import { ContextProvider } from "./context/context";
import Container from "react-bootstrap/Container";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

class App extends React.Component {
  state = {
    authentication: false,
    fetching: true,
    orders: null,
    customers: null
  };

  async componentDidMount() {
    if (this.state.fetching === true) {
      try {
        const orderResponse = await axios.get("dashboard/orders");
        const custResponse = await axios.get("dashboard/customers");
        const token = localStorage.getItem("token");
        const authentication = await axios.get(
          "http://localhost:5000/user/current-user",
          { headers: { token: token } }
        );
        this.setState({
          orders: orderResponse.data,
          customers: custResponse.data,
          fetching: false,
          authentication: true,
          currentUser: authentication.data
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // get countries list data
  login = async userCredentials => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        userCredentials
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      this.setState({
        authentication: true
      });
    } catch (err) {
      this.setState({
        authentication: false,
        error: err
      });
    }
  };

  // get countries list data
  logout = () => {
    this.setState({
      authentication: false
    });
  };

  payOrder(order) {
    axios
      .post("/dashboard/pay/", {
        order
      })
      .then(() => {
        alert(`order payed!`);
      })
      .catch(error => {
        alert("problem paying order");
        console.log(error);
      });
  }

  fullfillOrder(order) {
    axios
      .post("/dashboard/fullfill/", {
        order
      })
      .then(() => {
        alert(`order Fullfilled!`);
      })
      .catch(error => {
        alert("problem Fullfilling order");
        console.log(error);
      });
  }

  refundOrder(order) {
    axios
      .post("/dashboard/pay/", {
        order
      })
      .then(() => {
        alert(`order payed!`);
      })
      .catch(error => {
        alert("problem paying order");
        console.log(error);
      });
  }

  render() {
    if (this.state.authentication) {
      return (
        <ContextProvider
          value={{
            ...this.state,
            payOrder: this.payOrder,
            fullfillOrder: this.fullfillOrder,
            refundOrder: this.refundOrder,
            setNavigation: this.setNavigation
          }}
        >
          <Router>
            <Navbar logout={this.logout} />
            <Switch>
              <Container>
                <Route exact path="/" component={Orders} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/customers" component={Customers} />
                <Route exact path="/order" component={OrderDetails} />
                <Route exact path="/customer" component={CustomerDetails} />
              </Container>
            </Switch>
          </Router>
        </ContextProvider>
      );
    } else {
      return <Login login={this.login} />;
    }
  }
}

export default App;
