import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ContextConsumer } from "../context/context";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const convertTime = epoch => {
  return new Date(epoch * 1000).toDateString();
};

const OrderDetails = props => {
  let {
    amount,
    customer: customer_id,
    email,
    id,
    items,
    status,
    shipping,
    created
  } = props.location.state.order;
  let { city, country, line1, postal_code, state } = shipping.address;
  return (
    <ContextConsumer>
      {value => {
        console.log(value);
        let customer = value.customers.data.find(
          cust => cust.id === customer_id
        );
        let order = {
          order_id: id,
          token: customer.default_source
        };
        return (
          <div className="order-details">
            <h2 className="content-title">{id}</h2>
            <p>
              <i>{convertTime(created)} </i>
            </p>
            <div>
              <h3>
                {status === "created" && (
                  <Badge variant="secondary">Created</Badge>
                )}
                {status === "paid" && <Badge variant="primary">Paid</Badge>}
                {status === "fulfilled" && (
                  <Badge variant="success">Fullfilled</Badge>
                )}
                {status === "refunded" && (
                  <Badge variant="warning">Refunded</Badge>
                )}
              </h3>

              <h3>Customer Details</h3>
              <p>
                <strong>name: </strong>
                {shipping.name} <br /> <strong>phone: </strong>
                {shipping.phone} <br /> <strong>email: </strong>
                {email}
              </p>

              <h3>Order Items</h3>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                {items.map(item => (
                  <tbody>
                    <tr>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount / 100}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>

              <p className="total">
                <h6>Total: ${amount / 100}</h6>
              </p>
              <h3>Shipping Details</h3>
              <p>
                {line1}
                <br />
                {city}, {postal_code} <br />
                {state}, {country}
              </p>
              <h3>
                {status === "created" && (
                  <Link to="/orders">
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        value.payOrder(order);
                      }}
                    >
                      Collect Payment
                    </Button>
                  </Link>

                  // <div onClick={() => value.payOrder(this)}>Get money</div>
                )}
                {status === "paid" && (
                  <Link to="/orders">
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        value.fullfillOrder(order);
                      }}
                    >
                      Posted
                    </Button>
                  </Link>
                )}
                {status === "fulfilled" && (
                  <Link to="/">
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        value.refundOrder(order);
                      }}
                    >
                      Refund
                    </Button>
                  </Link>
                )}
              </h3>
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
};
export default OrderDetails;

{
  /* <ButtonToolbar>
  <Button variant="outline-secondary">Secondary</Button>
  <Button variant="outline-success">Success</Button>
  <Button variant="outline-warning">Warning</Button>
  <Button variant="outline-danger">Danger</Button>
  <Button variant="outline-info">Info</Button>
  <Button variant="outline-light">Light</Button>
  <Button variant="outline-dark">Dark</Button>
</ButtonToolbar>; */
}
