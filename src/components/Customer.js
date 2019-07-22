import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";

const convertTime = epoch => {
  return new Date(epoch * 1000).toDateString();
};
const Customer = props => {
  let { address, created, email, name, phone } = props.customer;
  console.log(props);
  return (
    <Row>
      <Col>
        <p>{name}</p>
      </Col>
      <Col>
        <p>{email}</p>
      </Col>
      <Col>
        <p>{phone}</p>
      </Col>
      <Col>
        <p>{convertTime(created)}</p>
      </Col>
    </Row>
  );
};
export default Customer;
