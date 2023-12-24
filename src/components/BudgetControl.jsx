import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetControl = ({
  budget,
  setBudget,
  spents,
  setSpents,
  setIsValidBudget,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spented, setSpented] = useState(0);

  useEffect(() => {
    const totalSpented = spents.reduce(
      (total, spent) => spent.spentQuantity + total,
      0
    );
    const totalAvailable = budget - totalSpented;
    const spentPercentage = (
      ((budget - totalAvailable) / budget) *
      100
    ).toFixed(2);

    setPercentage(spentPercentage);
    setAvailable(totalAvailable);
    setSpented(totalSpented);
  }, [spents]);

  const formatBudget = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetBudget = () => {
    if (!window.confirm("Deseas reiniciar el presupuesto gastos?")) return;

    setBudget([]);
    setSpents([]);
    setIsValidBudget(false);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "red" : "#3B82F6",
            trailColor: "#f5f5f5",
            textColor: "#3B82F6",
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={() => handleResetBudget()}
        >
          Resetar presupuesto
        </button>
        <p>
          <span>Presupuesto: </span> {formatBudget(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatBudget(available)}
        </p>
        <p>
          <span>Gastado: </span> {formatBudget(spented)}
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;
