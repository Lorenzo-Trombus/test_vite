/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Professori.css"; 
import { useNavigate } from "react-router-dom";

const Ricercatori = () => {
  const [ricercatori, setRicercatori] = useState([]);
  const [filteredRicercatori, setFilteredRicercatori] = useState([]); // Dati filtrati
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState(""); // Stato per la ricerca
  const navigate = useNavigate(); 

  useEffect(() => {
    // Carica il file JSON dal server locale
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        // Estrai i ricercatori dal JSON
        const ricercatoriData = data.professori.ricercatori;
        setRicercatori(ricercatoriData);
        setFilteredRicercatori(ricercatoriData); // Popola l'array filtrato inizialmente
      })
      .catch((error) =>
        console.error("Errore nel caricamento dei dati dei Ricercatori:", error)
      );
  }, []);

  // Funzione per ordinare i dati
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredRicercatori].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredRicercatori(sortedData);
  };

  // Funzione di filtraggio in base al nome e cognome
  useEffect(() => {
    const filtered = ricercatori.filter((item) =>
      `${item.nome} ${item.cognome}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRicercatori(filtered);
  }, [searchTerm, ricercatori]);

  return (
    <div className="container mt-5">
      <br />
      <h1 className="text-center mb-4">Ricercatori</h1>

      {/* Campo di ricerca */}
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
              <th onClick={() => sortData("stipendio")}>
                Stipendio (€) {sortConfig.key === "stipendio" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRicercatori.length > 0 ? (
              filteredRicercatori.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.cognome}</td>
                  <td>
                    <span className="salary">{item.stipendio} €</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Nessun ricercatore trovato.
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
      </div><br />
    </div>
  );
};

export default Ricercatori;
