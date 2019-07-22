import React from "react";
import { ContextConsumer } from "../context/context";
import Order from "./Order";
import { Link } from "react-router-dom";

const convertTime = epoch => {
  return new Date(epoch * 1000).toDateString();
};
const CustomerDetails = props => {
  let {
    address,
    created,
    email,
    id,
    name,
    phone
  } = props.location.state.customer;
  let { city, country, line1, postal_code, state } = address;
  return (
    <ContextConsumer>
      {value => {
        let orders = value.orders.data.filter(order => order.customer === id);
        return (
          <div className="order-details">
            <h3 className="content-title">{name}</h3>
            <p>
              <strong>Created on: </strong>
              {convertTime(created)} <br />
              <strong>Email: </strong> {email} <br />
              <strong>Phone: </strong> {phone} <br />
              <strong>Customer ID: </strong> {id}
            </p>

            <h3>Shipping Details</h3>
            <p>
              {line1}
              <br />
              {city}, {postal_code} <br />
              {state}, {country}
            </p>
            <h3>Orders</h3>
            {orders.map((order, index) => (
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
          </div>
        );
      }}
    </ContextConsumer>
  );
};
export default CustomerDetails;
