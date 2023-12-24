import React from "react";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtro Gastos</label>
          <select value={filters} onChange={(e) => setFilters(e.target.value)}>
            <option value="" disabled>
              -- Seleccionar --
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        {filters && (
          <input
            type="button"
            onClick={() => setFilters("")}
            value={" Eliminar filtro"}
          />
        )}
      </form>
    </div>
  );
};

export default Filters;
