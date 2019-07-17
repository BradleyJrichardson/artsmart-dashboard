import React from "react";
import axios from "axios";
import Order from "./Order";

class Dashboard extends React.Component {
  state = {
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
          fetching: false
        });
      } catch (err) {
        console.log(err);
      }
    }
    console.log(this.state);
  }

  render() {
    if (this.state.fetching === true) {
      return <h1>loading component</h1>;
    } else {
      let { data } = this.state.orders;
      return (
        <React.Fragment>
          <h1>Orders</h1>
          {data.map((order, index) => (
            <Order key={index} order={order} />
          ))}
        </React.Fragment>
      );
    }
  }
}

export default Dashboard;
