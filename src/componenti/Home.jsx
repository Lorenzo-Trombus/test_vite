// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from "./Card";

const Home = () => {
  return (
    <div>
      <div className="cards-container">
        <Card title="Professori" text="Lista di tutti i professori" path="/professori" />
        <Card title="Ordinari" text="Lista dei professori ordinari" path="/ordinari" />
        <Card title="Associati" text="Lista dei professori associati" path="/associati" />
        <Card title="Ricercatori" text="Lista dei ricercatori" path="/ricercatori" />
        <Card title="Corsi" text = "Lista dei corsi" path= "/corsi"/>
      </div>
    </div>
  );
};

export default Home;
