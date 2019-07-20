import React from "react";
import { ContextConsumer } from "../context/context";
import { Link } from "react-router-dom";
import Order from "./Order";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Customers = () => {
  return (
    <ContextConsumer>
      {value => {
        let { data } = value.orders;
        console.log(value);

        const convertTime = epoch => {
          return new Date(epoch * 1000).toDateString();
        };

        return (
          <React.Fragment>
            <h1 className="content-title">Customers</h1>
            <Breadcrumb sticky="top">
              <Breadcrumb.Item>All</Breadcrumb.Item>
              <Breadcrumb.Item>Created</Breadcrumb.Item>
              <Breadcrumb.Item>Paid</Breadcrumb.Item>
              <Breadcrumb.Item>Fullfiled</Breadcrumb.Item>
              <Breadcrumb.Item>Refunded</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
              <Col xs={4} md={2}>
                <h4 className="status">Status</h4>
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
            </Row>
            {data.map((order, index) => (
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
            ))}
            <div className="text"> hello</div>
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};
export default Customers;
