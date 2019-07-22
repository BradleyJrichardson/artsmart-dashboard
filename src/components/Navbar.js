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
        <div className="logout-div">
          <h5>
            <b>Signed is as: </b> <i>Libby Richardson</i>
            <Link
              to="/"
              onClick={() => {
                this.props.logout();
              }}
            >
              <h3 className="nav-items">
                <Badge variant="danger">Logout </Badge>
              </h3>
            </Link>
          </h5>
        </div>
      </nav>
    );
  }
}

export default Navbar;
