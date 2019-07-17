import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const OrderDetails = props => {
  let {
    amount,
    customer,
    email,
    id,
    items,
    status,
    shipping
  } = props.location.state.order;
  console.log(props.location.state.order);
  return (
    <div>
      <h3>{id}</h3>
      <div>
        <h3>
          {status === "created" && <Badge variant="secondary">Created</Badge>}
          {status === "paid" && <Badge variant="primary">Created</Badge>}
          {status === "fulfilled" && <Badge variant="success">Created</Badge>}
          {status === "refunded" && <Badge variant="warning">Created</Badge>}
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
        <p>Total: {amount}</p>
        <Button variant="outline-primary">
          Get Money Die Young (process payment)
        </Button>
        <Button variant="outline-danger">Refund</Button>
        <Button variant="outline-success">Posted</Button>
      </div>
    </div>
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
