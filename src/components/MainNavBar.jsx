import { useRouteLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function MainNavBar() {
  const token = useRouteLoaderData("root");
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">eCoupon Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {token && (
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/coupons">coupons</Nav.Link>
              <Nav.Link href="/games">games</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
              <Button variant="outline-secondary" href="/logout">
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        )}
        {!token && (
          <Form className="d-flex">
            <Button variant="outline-success">
              <Link to="/login">Login</Link>
            </Button>
          </Form>
        )}
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
