import React, { useEffect, useState } from "react";
import closeIcon from "../img/cerrar.svg";
import Message from "./Message";

const NewSpentModal = ({
  setModalOpen,
  saveSpent,
  spentToEdit,
  setSpentToEdit,
}) => {
  const [hasError, setHasError] = useState(false);
  const [spentName, setSpentName] = useState("");
  const [spentQuantity, setSpentQuantity] = useState(0);
  const [spentCategory, setSpentCategory] = useState("");

  useEffect(() => {
    if (Object.keys(spentToEdit).length > 0) {
      setSpentName(spentToEdit.spentName);
      setSpentQuantity(spentToEdit.spentQuantity);
      setSpentCategory(spentToEdit.spentCategory);
    }
  }, [spentToEdit]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    if ([spentName, spentQuantity, spentCategory].includes("")) {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }

    setHasError(false);
    saveSpent({
      id: spentToEdit.id ? spentToEdit.id : null,
      date: Date.now(),
      spentName,
      spentQuantity,
      spentCategory,
    });
  };

  const onCloseModal = () => {
    if (Object.keys(spentToEdit).length > 0) setSpentToEdit({});

    setModalOpen(false);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal" onClick={() => onCloseModal()}>
        <img src={closeIcon} alt="Cerrar modal" />
      </div>
      <form className="formulario" onSubmit={onFormSubmit}>
        <legend>{spentToEdit ? "Editar gasto" : "Nuevo gasto"}</legend>
        {hasError && (
          <Message type="error">
            <p>TODOS LOS CAMPOS SON OBLIGATORIOS</p>
          </Message>
        )}
        <div className="campo">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            id="name"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            value={spentName}
            onChange={(e) => setSpentName(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            type="number"
            placeholder="Añade la cantidad. Ej: 3000"
            value={spentQuantity}
            onChange={(e) => setSpentQuantity(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={spentCategory}
            onChange={(e) => setSpentCategory(e.target.value)}
          >
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
        <input
          type="submit"
          value={spentToEdit ? "Modificar gasto" : "Añadir gasto"}
        />
      </form>
    </div>
  );
};

export default NewSpentModal;
