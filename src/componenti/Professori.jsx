// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Professori.css";
import { useNavigate } from "react-router-dom";

const Professori = () => {
  const [professori, setProfessori] = useState([]);
  const [filteredProfessori, setFilteredProfessori] = useState([]); // Professori filtrati
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState(""); // Stato per la ricerca
  const navigate = useNavigate(); 

  useEffect(() => {
    // Carica il file JSON dal public folder
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        // Combina tutti i professori dalle 3 categorie
        const allProfessori = [
          ...data.professori.ordinari,
          ...data.professori.associati,
          ...data.professori.ricercatori,
        ];
        setProfessori(allProfessori);  // Imposta i dati dei professori
        setFilteredProfessori(allProfessori); // Imposta i professori filtrati
      })
      .catch((error) => console.error("Errore nel caricamento del database: ", error));
  }, []);

  // Funzione per ordinare i dati
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredProfessori].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProfessori(sortedData);
  };

  // Funzione per filtrare i dati in base al termine di ricerca
  useEffect(() => {
    const filtered = professori.filter((item) =>
      `${item.nome} ${item.cognome}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfessori(filtered);
  }, [searchTerm, professori]);

  return (
    <div className="container mt-5">
      <br />
      <h1 className="text-center mb-4">Professori</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Cerca per nome e cognome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => sortData("nome")}>
                Nome {sortConfig.key === "nome" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => sortData("cognome")}>
                Cognome {sortConfig.key === "cognome" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th>Materia</th>
              <th onClick={() => sortData("anni_insegnamento")}>
                Anni di insegnamento {sortConfig.key === "anni_insegnamento" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th>Dipartimento</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessori.length > 0 ? (
              filteredProfessori.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.cognome}</td>
                  <td>{item.materia}</td>
                  <td>{item.anni_insegnamento}</td>
                  <td>{item.dipartimento}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Nessun professore trovato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Torna alla Home
        </button>
      </div>
      <br />
    </div>
  );
};

export default Professori;
