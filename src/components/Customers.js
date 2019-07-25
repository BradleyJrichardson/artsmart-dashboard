import React from "react";
import { ContextConsumer } from "../context/context";
import { Link } from "react-router-dom";
import Customer from "./Customer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Customers = () => {
  return (
    <ContextConsumer>
      {value => {
        let { data: customers } = value.customers;
        console.log(customers);

        const convertTime = epoch => {
          return new Date(epoch * 1000).toDateString();
        };

        return (
          <React.Fragment>
            <h1 className="content-title">Customers</h1>
            <Row>
              <Col>
                <h4>Name</h4>
              </Col>
              <Col>
                <h4>Email</h4>
              </Col>
              <Col>
                <h4>Phone</h4>
              </Col>
              <Col>
                <h4>Created</h4>
              </Col>
            </Row>
            {customers.map((customer, index) => (
              <Link
                key={index}
                to={{
                  pathname: "/customer",
                  state: {
                    customer: customer
                  }
                }}
              >
                <Customer key={index} customer={customer} />
              </Link>
            ))}
          </React.Fragment>
        );
      }}
    </ContextConsumer>
  );
};
export default Customers;
