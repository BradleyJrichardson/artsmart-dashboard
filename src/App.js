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

class App extends React.Component {
  state = {
    auth: false,
    fetching: true,
    orders: null,
    customers: null
  };

  async componentDidMount() {
    if (this.state.fetching === true) {
      try {
        const orderResponse = await axios.get("dashboard/orders");
        const custResponse = await axios.get("dashboard/customers");
        this.setState({
          orders: orderResponse.data,
          customers: custResponse.data,
          fetching: false,
          auth: true
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

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
    if (this.state.auth) {
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
            <Navbar />
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
  }
}

export default App;
