import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container fluid>
        <Navbar.Brand href="/">Accademia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/professori" className='mx-3'>Professori</Nav.Link>
            <Nav.Link href="/ordinari" className='mx-3'>Professore Ordinario</Nav.Link>
            <Nav.Link href="/associati" className='mx-3'>Professore Associato</Nav.Link>
            <Nav.Link href="/ricercatori" className='mx-3'>Ricercatore</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;