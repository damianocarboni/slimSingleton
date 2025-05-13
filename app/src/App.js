import "./App.css";
import { useState } from "react";
import AlunniTable from "./AlunniTable";
function App() {
  const [alunni, setAlunni] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [elimina, setElimina] = useState(false);
  async function caricaAlunni() {
    setCaricamento(true);
    const data = await fetch("http://localhost:8080/alunni", { method: "GET" });
    const mieiDati = await data.json();
    setCaricamento(false);
    setAlunni(mieiDati);
  }

  return (
    <div className="App">
      {alunni.length > 0 && !caricamento ? (
        <AlunniTable myArray={alunni} caricaAlunni={caricaAlunni} />
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
