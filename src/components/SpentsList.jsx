import React from "react";
import SpentCard from "./SpentCard";

const SpentsList = ({
  spents,
  setSpentToEdit,
  deleteSpent,
  filters,
  filteredSpents,
}) => {
  const renderList = (arr) => (
    <>
      <h2>{spents.length ? "Gastos" : "No hay gastos aún"}</h2>
      {arr.map((spent) => (
        <SpentCard
          key={spent.id}
          spent={spent}
          setSpentToEdit={setSpentToEdit}
          deleteSpent={deleteSpent}
        />
      ))}
    </>
  );

  return (
    <div className="listado-gastos contenedor">
      {renderList(filters ? filteredSpents : spents)}
    </div>
  );
};

export default SpentsList;
