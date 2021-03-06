import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const NavBar = (props) => {
  let navElements = [];
  props.private === false
    ? (navElements = [
        {
          id: 0,
          link: "/",
          text: "Home",
        },
        {
          id: 1,
          link: "/login",
          text: "Log in",
        },
        {
          id: 2,
          link: "/signup",
          text: "Sign up",
        },
      ])
    : (navElements = [
        {
          id: 3,
          link: "/",
          text: "Log out",
        },
        {
          id: 4,
          link: "/session",
          text: "Session",
        },
        {
          id: 5,
          link: "/notes",
          text: "Notes",
        },
        {
          id: 6,
          link: "/createNote",
          text: "New note",
        },
      ]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {navElements.map((navElement) => {
            return (
              <Nav.Link href={navElement.link} key={navElement.id}>
                {navElement.text}
              </Nav.Link>
            );
          })}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
