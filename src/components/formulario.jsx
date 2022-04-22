import React from "react";
import { firebase } from "../firebase";

const Formulario = () => {
  const [lista, setLista] = React.useState([]);
  const [componentes, setComponentes] = React.useState({
    placa: "",
    marca: "",
    color: "",
    modelo: "",
    precio: "",
    año: "",
    motor: "",
  });
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("carros").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setLista(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  });

  const guardarDatos = async (e) => {
    e.preventDefault();
    if (
      !componentes.marca.trim() ||
      !componentes.placa.trim() ||
      !componentes.color.trim() ||
      !componentes.motor.trim() ||
      !componentes.año.trim() ||
      !componentes.modelo.trim() ||
      componentes.precio < 1
    ) {
      setError("Hay campos vacios");
      return;
    }

    try {
      const db = firebase.firestore();
      const nuevoCarro = {
        placa: componentes.placa,
        marca: componentes.marca,
        color: componentes.color,
        modelo: componentes.modelo,
        precio: componentes.precio,
        año: componentes.año,
        motor: componentes.motor,
      };
      await db.collection("carros").add(nuevoCarro);
    } catch (error) {
      console.log(error);
    }

    setModoEdicion(false);
    setComponentes({
      placa: "",
      marca: "",
      color: "",
      modelo: "",
      precio: "",
      año: "",
      motor: "",
    });
    setError(null);
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("carros").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const auxEditar = (item) => {
    setComponentes({ ...item });
    setModoEdicion(true);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();

    if (
      !componentes.marca.trim() ||
      !componentes.placa.trim() ||
      !componentes.color.trim() ||
      !componentes.motor.trim() ||
      !componentes.año.trim() ||
      !componentes.modelo.trim() ||
      componentes.precio < 1
    ) {
      setError("Hay campos vacios");
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection("carros").doc(id).update({
        placa: componentes.placa,
        marca: componentes.marca,
        color: componentes.color,
        modelo: componentes.modelo,
        precio: componentes.precio,
        año: componentes.año,
        motor: componentes.motor,
      });
    } catch (error) {
      console.log(error);
    }
    setComponentes({
      placa: "",
      marca: "",
      color: "",
      modelo: "",
      precio: "",
      año: "",
      motor: "",
    });
    setModoEdicion(false);
    setError(null);
  };

  const cancelar = () => {
    setComponentes({
      placa: "",
      marca: "",
      color: "",
      modelo: "",
      precio: "",
      año: "",
      motor: "",
    });
    setModoEdicion(false);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <h1 className="text-center mx-2 ">CARROS</h1>
        <img src="../../carro-deportivo.png" alt="carro" width={60} />
      </div>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listado de carros</h4>
          <ul className="list-group">
            {lista.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">
                  {item.marca} - {item.modelo} - {item.color} - {item.placa} -{" "}
                  {item.año} - {item.precio} - {item.motor}
                </span>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => auxEditar(item)}
                >
                  editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Carros" : "Agregar Carros"}
          </h4>
          <form onSubmit={modoEdicion ? editar : guardarDatos}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese Marca"
              onChange={(e) =>
                setComponentes({ ...componentes, marca: e.target.value })
              }
              value={componentes.marca}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese modelo"
              onChange={(e) =>
                setComponentes({ ...componentes, modelo: e.target.value })
              }
              value={componentes.modelo}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese color"
              onChange={(e) =>
                setComponentes({ ...componentes, color: e.target.value })
              }
              value={componentes.color}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese placa"
              onChange={(e) =>
                setComponentes({ ...componentes, placa: e.target.value })
              }
              value={componentes.placa}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese año"
              onChange={(e) =>
                setComponentes({ ...componentes, año: e.target.value })
              }
              value={componentes.año}
            />
            <input
              className="form-control mb-2"
              type="number"
              placeholder="Ingrese precio"
              onChange={(e) =>
                setComponentes({ ...componentes, precio: e.target.value })
              }
              value={componentes.precio}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese motor"
              onChange={(e) =>
                setComponentes({ ...componentes, motor: e.target.value })
              }
              value={componentes.motor}
            />
            {!modoEdicion ? (
              <button className="btn btn-primary btn-block" type="submit">
                Agregar
              </button>
            ) : (
              <>
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
                <button
                  className="btn btn-dark btn-block mx-2"
                  onClick={() => cancelar()}
                >
                  Cancelar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
