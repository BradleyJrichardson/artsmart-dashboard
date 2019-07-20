import React from "react";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";

const convertTime = epoch => {
  return new Date(epoch * 1000).toDateString();
};

const Order = props => {
  let { amount, email, status, shipping, created, items } = props.order;

  console.log(props.order);
  return (
    <Row>
      <Col xs={4} md={2}>
        <h4 className="status">
          {status === "created" && <Badge variant="secondary">Created</Badge>}
          {status === "paid" && <Badge variant="primary">Paid</Badge>}
          {status === "fulfilled" && (
            <Badge variant="success">Fullfilled</Badge>
          )}
          {status === "refunded" && <Badge variant="warning">Refunded</Badge>}
        </h4>
      </Col>
      <Col>
        <p>{convertTime(created)}</p>
      </Col>
      <Col>
        <p>${amount / 100}.00</p>
      </Col>
      <Col>
        <p>{shipping.name}</p>
      </Col>
      <Col>
        <p>{shipping.phone}</p>
      </Col>
      <Col>
        <p>{email}</p>
      </Col>
      <Col>
        <OverlayTrigger
          trigger="hover"
          placement="left"
          overlay={
            <Popover id="popover-basic">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Item</th>
                  </tr>
                </thead>

                {items.map(item => (
                  <tbody>
                    <tr>
                      <td> {item.description}</td>
                      <td> {item.quantity}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Popover>
          }
        >
          <h3>
            <Badge variant="outline-dark">🛒</Badge>
          </h3>
        </OverlayTrigger>
      </Col>
    </Row>
  );
};
export default Order;
