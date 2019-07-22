import React from "react";
import { ContextConsumer } from "../context/context";
import { Link } from "react-router-dom";
import Order from "./Order";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Orders extends React.Component {
  state = {
    filter: "all"
  };

  render() {
    return (
      <ContextConsumer>
        {value => {
          let { data } = value.orders;

          const mapAll = () => {
            return data.map((order, index) => (
              <Link
                key={index}
                to={{
                  pathname: "/order",
                  state: {
                    order: order
                  }
                }}
              >
                <Order key={index} order={order} />
              </Link>
            ));
          };

          const mapFilter = () => {
            return data
              .filter(order => {
                return order.status === this.state.filter;
              })
              .map((order, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: "/order",
                    state: {
                      order: order
                    }
                  }}
                >
                  <Order key={index} order={order} />
                </Link>
              ));
          };

          return (
            <React.Fragment>
              <h1 className="content-title">Orders</h1>
              <Breadcrumb sticky="top">
                <Breadcrumb.Item
                  onClick={() => {
                    this.setState({
                      filter: "all"
                    });
                  }}
                >
                  All
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  onClick={() => {
                    this.setState({
                      filter: "created"
                    });
                  }}
                >
                  Created
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  onClick={() => {
                    this.setState({
                      filter: "paid"
                    });
                  }}
                >
                  Paid
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  onClick={() => {
                    this.setState({
                      filter: "fulfilled"
                    });
                  }}
                >
                  Fullfiled
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  onClick={() => {
                    this.setState({
                      filter: "refunded"
                    });
                  }}
                >
                  Refunded
                </Breadcrumb.Item>
              </Breadcrumb>

              <Row>
                <Col xs={4} md={2}>
                  <h4 className="status">Status</h4>
                </Col>
                <Col>
                  <h4>Date</h4>
                </Col>
                <Col>
                  <h4>Amount</h4>
                </Col>
                <Col>
                  <h4>Name</h4>
                </Col>
                <Col>
                  <h4>Phone</h4>
                </Col>
                <Col>
                  <h4>Email</h4>
                </Col>
                <Col>
                  <h4>Items</h4>
                </Col>
              </Row>
              {this.state.filter === "all" ? mapAll() : mapFilter()}

              <div className="text"> hello</div>
            </React.Fragment>
          );
        }}
      </ContextConsumer>
    );
  }
}
export default Orders;
