import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import axios from 'axios'; 


function NavB() {
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setError(null); 
      const response = await axios.get(url);

      // if (!response.ok) {
      //   throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
      // }

      //const json = await response.json();
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
      setError(err.message);
    }
  };

  const getTableHeaders = (data) => {
    if (data && data.length > 0) {
      return Object.keys(data[0]); 
    }
    return [];
  };

  const generateTableRows = (data) => {
    return data.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, i) => (
          <td key={i}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Nav.Link onClick={() => fetchData('http://localhost:5004/assenza')}> Assenza </Nav.Link>  
      <Nav.Link onClick={() => fetchData('http://localhost:5004/progetto')}> Progetto </Nav.Link> 
      <Nav.Link onClick={() => fetchData('http://localhost:5004/wp')}> WP </Nav.Link> 

      {error && <div style={{ color: 'red' }}>Errore: {error}</div>}

      {data && (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              {getTableHeaders(data).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {generateTableRows(data)}
          </tbody>
        </Table>
      )}
    </Navbar>
  );
}

export default NavB;