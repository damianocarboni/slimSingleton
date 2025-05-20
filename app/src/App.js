import "./App.css";
import { useState } from "react";
import AlunniTable from "./AlunniTable";
function App() {
  const [alunni, setAlunni] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [elimina, setElimina] = useState(false);
  const [inserisci, setInserisci] = useState(false);

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [ErrNome, setErrNome] = useState("");


  async function caricaAlunni() {
    setCaricamento(true);
    const data = await fetch("http://localhost:8080/alunni", { method: "GET" });
    const mieiDati = await data.json();
    setCaricamento(false);
    setAlunni(mieiDati);
  }

  async function salvaAlunno(){
    if(nome === "" || cognome === ""){
      setErrNome("Nome e cognome obbligatori");
      return;
    }
    const data = await fetch("http://localhost:8080/alunni", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({nome: nome, cognome: cognome})
    })
    setInserisci(false);
    caricaAlunni();
    setCognome("");
    setErrNome("");
    setNome("");
  }

  return (
    <div className="App">
      {alunni.length > 0 && !caricamento ? (
        <div>
        <AlunniTable myArray={alunni} caricaAlunni={caricaAlunni} />
        {inserisci ? (
          <div>
            <div>
              <h5>nome:</h5>
              <input onChange={(e) => setNome(e.target.value)} type="text"></input>
            </div>

            <div>
              <h5>cognome:</h5>
              <input onChange={(e) => setCognome(e.target.value)} type="text"></input>
            </div>

            <div>
              <button onClick={() => salvaAlunno()}>Salva</button>
              {ErrNome !== ""&& <div>{ErrNome}</div>}
              <button onClick={() => setInserisci(false)}>torna indietro</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setInserisci(true)}>Inserisci nuovo alunno</button>
        )}
        </div>
      ) : (
        <div>
          {caricamento ? (
            <div>caricamento in corso</div>
          ) : (
            <button onClick={caricaAlunni}>carica alunni</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
