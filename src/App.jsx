import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SpentsList from "./components/SpentsList";
import NewSpentIcon from "./img/nuevo-gasto.svg";
import NewSpentModal from "./components/NewSpentModal";
import Filters from "./components/Filters";

function App() {
  const [budget, setBudget] = useState(0);
  const [spents, setSpents] = useState([]);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [spentToEdit, setSpentToEdit] = useState({});
  const [filters, setFilters] = useState("");
  const [filteredSpents, setFilteredSpents] = useState([]);

  useEffect(() => {
    if (Object.keys(spentToEdit).length > 0) setModalOpen(true);
  }, [spentToEdit]);

  useEffect(() => {
    if (filters) {
      const filteredSpents = spents.filter(
        (spent) => spent.spentCategory === filters
      );
      setFilteredSpents(filteredSpents);
    }
  }, [filters]);

  const saveSpent = (newSpent) => {
    if (newSpent.id) {
      const updatedSpents = spents.map((stateSpents) =>
        stateSpents.id === newSpent.id ? newSpent : stateSpents
      );
      setSpents(updatedSpents);
      setSpentToEdit({});
    } else {
      newSpent.id = crypto.randomUUID();
      setSpents([...spents, newSpent]);
    }
    setModalOpen(false);
  };

  const deleteSpent = (id) => {
    if (!confirm("Desea eliminar este evento?")) return;

    const filteredSpents = spents.filter((spent) => spent.id !== id);
    setSpents(filteredSpents);
  };

  return (
    <div className={isModalOpen ? "fijar" : ""}>
      <Header
        spents={spents}
        setSpents={setSpents}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters filters={filters} setFilters={setFilters} />
            <SpentsList
              spents={spents}
              setSpentToEdit={setSpentToEdit}
              deleteSpent={deleteSpent}
              filters={filters}
              filteredSpents={filteredSpents}
            />
          </main>
          <div className="nuevo-gasto" onClick={() => setModalOpen(true)}>
            <img src={NewSpentIcon} alt="Nuevo gasto" />
          </div>
        </>
      )}
      {isModalOpen && (
        <NewSpentModal
          setModalOpen={setModalOpen}
          saveSpent={saveSpent}
          spentToEdit={spentToEdit}
          setSpentToEdit={setSpentToEdit}
        />
      )}
    </div>
  );
}

export default App;
