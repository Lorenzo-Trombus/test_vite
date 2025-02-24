from flask import Flask, jsonify
from flask_cors import CORS # type: ignore
import psycopg2

app = Flask(__name__)
CORS(app)

host="localhost"
port="5432"
dbname="Accademia"
user='postgres'
password="postgres"



try:
    connection = psycopg2.connect(
        host = host,
        port = port,
        dbname = dbname,
        user = user,
        password = password
    )
    print("connessione al database avvenuta con successo")

except Exception as e:
    print(f"Errore durante la connessione al database: {e}")


def execute_query(query, params=None):
    cursor = connection.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()
    return [dict(zip(column_names, row)) for row in rows]



@app.route('/ricercatori')
def visualizzaRicercatori():
    query = "SELECT * FROM Persona WHERE posizione = %s"
    return jsonify(execute_query(query, ('Ricercatore',)))


@app.route('/ordinari')
def visualizzaOrdinari():
    query = "SELECT * FROM Persona WHERE posizione = %s"
    return jsonify(execute_query(query, ('Professore Ordinario',)))



@app.route('/associati')
def visualizzaAssociati():
    query = "SELECT * FROM Persona WHERE posizione = %s"
    return jsonify(execute_query(query, ('Professore Associato',)))


@app.route('/professori')
def visualizzaProfessori():
    query = "SELECT * FROM Persona ORDER BY posizione"
    return jsonify(execute_query(query))




if __name__ == '__main__'  :
    print("Loading....")
    app.run(host="0.0.0.0", port=5002)