
// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Professori.css";
// import { useNavigate } from "react-router-dom";


// const Corsi = () => {
//   const [corsi, setCorsi] = useState([]);
//   const [filteredCorsi, setFilteredCorsi] = useState([]); // Corsi filtrati
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [searchTerm, setSearchTerm] = useState(""); // Stato per la ricerca
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     // Carica il file JSON dal public folder
//     fetch("/database.json")
//       .then((response) => response.json())
//       .then((data) => {
//         setCorsi(data.corsi);  // Imposta i dati dei corsi
//         setFilteredCorsi(data.corsi); // Imposta i corsi filtrati
//       })
//       .catch((error) => console.error("Errore nel caricamento del database: ", error));
//   }, []);

//   // Funzione per ordinare i dati
//   const sortData = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sortedData = [...filteredCorsi].sort((a, b) => {
//       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
//       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     setFilteredCorsi(sortedData);
//   };

//   // Funzione per filtrare i dati in base al termine di ricerca
//   useEffect(() => {
//     const filtered = corsi.filter((item) =>
//       item.nome.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCorsi(filtered);
//   }, [searchTerm, corsi]);

//   return (
//     <div className="container mt-5">
//       <br />
//       <h1 className="text-center mb-4">Corsi</h1>

//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Cerca per nome del corso..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="table-container">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th onClick={() => sortData("nome")}>
//                 Nome Corso {sortConfig.key === "nome" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
//               </th>
//               <th onClick={() => sortData("descrizione")}>
//                 Descrizione {sortConfig.key === "descrizione" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCorsi.length > 0 ? (
//               filteredCorsi.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.nome}</td>
//                   <td>{item.descrizione}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2" className="text-center">
//                   Nessun corso trovato.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center mt-4">
//         <button className="btn btn-primary" onClick={() => navigate("/")}>
//           Torna alla Home
//         </button>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default Corsi;
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Professori.css";

const Corsi = () => {
  const [corsi, setCorsi] = useState([]);
  const [professori, setProfessori] = useState([]);

  // Carica i dati dal file JSON nella cartella public
  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        setCorsi(data.corsi);
        setProfessori([
          ...data.professori.ordinari,
          ...data.professori.associati,
          ...data.professori.ricercatori,
        ]);
      })
      .catch((error) =>
        console.error("Errore nel caricare il database:", error)
      );
  }, []);

  // Funzione per trovare i professori di un corso
  const getProfessori = (professoriIds) => {
    return professori.filter((professore) =>
      professoriIds.includes(professore.id)  // Usa includes per controllare se l'ID è presente
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Corsi</h1>

      {corsi.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Corso</th>
                <th>Descrizione</th>
                <th>Professori</th>
              </tr>
            </thead>
            <tbody>
              {corsi.map((corso, index) => {
                // Ottieni i professori per ogni corso
                const professoriAssociati = getProfessori(corso.professori);

                return (
                  <tr key={index}>
                    <td>{corso.nome}</td>
                    <td>{corso.descrizione}</td>
                    <td>
                      {professoriAssociati.length > 0 ? (
                        <ul>
                          {professoriAssociati.map((prof, i) => (
                            <li key={i}>
                              {prof.nome} {prof.cognome} ({prof.materia})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Nessun professore assegnato</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nessun corso trovato</p>
      )}
    </div>
  );
};

export default Corsi;
