import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    customers: null,
    updated: false
  };

  async componentDidMount() {
    if (this.state.fetching === true) {
      try {
        const orderResponse = await axios.get(
          process.env.REACT_APP_BACK_URL + "/dashboard/orders"
        );
        const custResponse = await axios.get(
          process.env.REACT_APP_BACK_URL + "/dashboard/customers"
        );
        const token = localStorage.getItem("token");

        const authentication = await axios.get(
          process.env.REACT_APP_BACK_URL + "/user/current-user",
          { headers: { token: token } }
        );
        this.setState({
          orders: orderResponse.data,
          customers: custResponse.data,
          fetching: false,
          authentication: true,
          currentUser: authentication.data,
          updated: false
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  updateOrderStatus = async () => {
    debugger;
    try {
      const orderResponse = await axios.get(
        process.env.REACT_APP_BACK_URL + "/dashboard/orders"
      );
      this.setState({
        orders: orderResponse.data,
        updated: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  login = async userCredentials => {
    console.log("here");
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACK_URL + "/auth/login",
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

  logout = () => {
    this.setState({
      authentication: false
    });
  };

  payOrder = async order => {
    console.log(this);
    const response = await axios.post(
      process.env.REACT_APP_BACK_URL + "/dashboard/pay/",
      {
        order
      }
    );
    if (response) {
      this.setState({
        updated: true
      });
    }
  };

  fullfillOrder = async order => {
    const response = await axios.post(
      process.env.REACT_APP_BACK_URL + "/dashboard/fullfill/",
      {
        order
      }
    );
    if (response) {
      this.setState({
        updated: true
      });
    }
  };

  refundOrder = order => {
    axios
      .post(process.env.REACT_APP_BACK_URL + "/dashboard/pay/", {
        order
      })
      .then(() => {
        this.setState({
          updated: true
        });
      })
      .catch(error => {
        alert("problem paying order");
        console.log(error);
      });
  };

  render() {
    if (this.state.updated) {
      this.updateOrderStatus();
    }
    if (this.state.authentication) {
      if (this.state.orders) {
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
        return null;
      }
    } else {
      return (
        <Container>
          <Login login={this.login} />
        </Container>
      );
    }
  }
}

export default App;
