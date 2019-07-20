import React from "react";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    active: "orders"
  };

  render() {
    return (
      <nav className="nav">
        <div className="nav-items-container">
          {this.state.active === "orders" ? (
            <Link
              to="/orders"
              onClick={() => {
                this.setState({
                  active: "orders"
                });
              }}
            >
              <h2 className="nav-items">
                <Badge variant="success">Orders </Badge>
              </h2>
            </Link>
          ) : (
            <Link
              to="/orders"
              onClick={() => {
                this.setState({
                  active: "orders"
                });
              }}
            >
              <h2 className="nav-items">
                <Badge variant="secondary">Orders </Badge>
              </h2>
            </Link>
          )}

          {this.state.active === "customers" ? (
            <Link
              to="/customers"
              onClick={() => {
                this.setState({
                  active: "customers"
                });
              }}
            >
              <h2 className="nav-items">
                <Badge variant="success">Customers </Badge>
              </h2>
            </Link>
          ) : (
            <Link
              to="/customers"
              onClick={() => {
                this.setState({
                  active: "customers"
                });
              }}
            >
              <h2 className="nav-items">
                <Badge variant="secondary">Customers </Badge>
              </h2>
            </Link>
          )}
        </div>
        <h3>Artsmart Craft Cottage</h3>
        <h5>
          <b>Signed is as: </b> <i>Libby Richardson</i>
        </h5>
      </nav>
    );
  }
}

export default Navbar;

// {
//   status === "created" && <Badge variant="secondary">Created</Badge>;
// }
// {
//   status === "paid" && <Badge variant="primary">Paid</Badge>;
// }
