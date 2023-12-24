import React from "react";

import "react-swipeable-list/dist/styles.css";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const SpentCard = ({ spent, setSpentToEdit, deleteSpent }) => {
  const { id, spentName, spentQuantity, spentCategory, date } = spent;

  const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return newDate.toLocaleDateString("es-ES", options);
  };

  const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setSpentToEdit(spent)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteSpent(id)}>Eliminar</SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[spentCategory]} />
            <div className="descripcion-gasto">
              <p className="categoria">{spentCategory}</p>
              <p className="nombre-gasto">{spentName}</p>
              <p className="fecha-gasto">
                Agregado el: {""} <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{spentQuantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default SpentCard;
