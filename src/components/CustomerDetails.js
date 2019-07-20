import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ContextConsumer } from "../context/context";

const CustomerDetails = props => {
  let {
    amount,
    customer: customer_id,
    email,
    id,
    items,
    status,
    shipping
  } = props.location.state.order;

  return (
    <ContextConsumer>
      {value => {
        let customer = value.customers.data.find(
          cust => cust.id === customer_id
        );
        let order = {
          order_id: id,
          token: customer.default_source
        };
        return (
          <div className="order-details">
            <h3>{id}</h3>
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
              <p>{shipping.name}</p>
              <p>{shipping.phone}</p>
              <p>{email}</p>
              <h2>Order Items</h2>
              {items.map(item => (
                <div>
                  <p>${item.amount}</p>
                  <p>{item.description}</p>
                  <br />
                </div>
              ))}
              <p>Total: {amount / 100}</p>
              <h3>
                {status === "created" && (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      value.payOrder(order);
                    }}
                  >
                    Get Money (process payment)
                  </Button>
                )}
                {status === "paid" && (
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      value.fullfillOrder(order);
                    }}
                  >
                    Posted
                  </Button>
                )}
                {status === "fulfilled" && (
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      value.refundOrder(order);
                    }}
                  >
                    Refund
                  </Button>
                )}
              </h3>
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
};
export default CustomerDetails;

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
