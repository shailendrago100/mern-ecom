// import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Avatar, Badge, Button, Dialog, Typography } from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { logout } from '../store/auth-actions';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function OffcanvasExample() {
  const user1 = useSelector((store) => store.auth.currentUser);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  let totalQuantity = 0;
  cart.products.map((p) => (totalQuantity += p.quantity));
  const logoutHandler = async () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="mb-0"
          style={{ "background-color": "white", "height": "70px" }}
        >
          <Container fluid>
            <Navbar.Brand href="/" style={{ "margin-left": "2.5vw", "fontSize":"28px", "font-weight":"550"}}>StyleZone</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              {/* <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{ "display": "none", "height": "0px" }}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header> */}
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {user1 ? (
                    user1.user.isAdmin ? (
                      <Link
                        to="/addAProduct"
                        className="uppercase px-4 py-2"
                      >
                        Create A Product
                      </Link>
                    ) : null
                  ) : (
                    " "
                  )}
                  <Link to="/aboutus" className="uppercase px-4 py-2">
                    About Us
                  </Link>
                  {user1 ? null : (
                    <Link to="/signup" className="uppercase px-4 py-2">
                      Sign up
                    </Link>
                  )}
                  {user1 ? (
                    <div
                      onClick={logoutHandler}
                      className="uppercase px-4 py-2"
                      style={{ cursor: "pointer" }}
                    >
                      logout
                    </div>
                  ) : (
                    <Link to="/login" className="uppercase px-4 py-2">
                      login
                    </Link>
                  )}

                  {user1 ? (
                    <div style={{ "margin-left":"20px" }}>
                    <Link to="/cart">
                      <Badge
                        badgeContent={totalQuantity}
                        color="primary"
                        className="cursor-pointer"
                        style={{  }}
                      >
                        <ShoppingCart />
                      </Badge>
                    </Link>
                    </div>
                  ) : null}
                  {/* <Nav.Link href="/addAProduct">Create A Product</Nav.Link>
                  <Nav.Link href="/aboutus">About Us</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
