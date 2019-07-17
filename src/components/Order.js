import React from "react";
import Badge from "react-bootstrap/Badge";

const Order = props => {
  // items is an array
  let { amount, email, status, shipping } = props.order;
  return (
    <div className="order-row">
      <h3>order</h3>
      <div>
        <p>Status: {status}</p>
        <p>Amount: {amount}</p>
        <p>{shipping.name}</p>
        <p>{shipping.phone}</p>
        <p>{email}</p>
        <h3>
          {status === "created" && <Badge variant="secondary">Created</Badge>}
          {status === "paid" && <Badge variant="primary">Created</Badge>}
          {status === "fulfilled" && <Badge variant="success">Created</Badge>}
          {status === "refunded" && <Badge variant="warning">Created</Badge>}
        </h3>
      </div>
    </div>
  );
};
export default Order;
