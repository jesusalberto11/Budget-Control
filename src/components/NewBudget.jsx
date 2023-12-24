import React, { useState } from "react";
import Message from "./Message";

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
  const [isInvalidBudgetType, setInvalidBudgetType] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!budget || budget < 0) {
      setInvalidBudgetType(true);
      return;
    }

    setInvalidBudgetType(false);
    setIsValidBudget(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleOnSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="prespuesto">Definir Presupuesto</label>
          <input
            id="prespuesto"
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
          <input type="submit" value="Añadir" />
          {isInvalidBudgetType && (
            <Message type={"error"}>
              <p>No es un presupuesto válido</p>
            </Message>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewBudget;
