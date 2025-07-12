import React, { useEffect, useRef, useState } from 'react';
import "./Agregar.css";
import { getAllCategorias, createCategoria, deleteCategoria } from "../../api/CategoriasApi";
import { crearProducto } from "../../api/productosApi"; // importa la función
import { useNavigate } from 'react-router-dom'; // importa useNavigate

const AgregarProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [archivoNombre, setArchivoNombre] = useState('');
  const fileInputRef = useRef(null);

  // NUEVO: Referencias para los campos del formulario
  const nombreRef = useRef();
  const presentacionRef = useRef();
  const descripcionRef = useRef();
  const stockRef = useRef();

  const navigate = useNavigate(); // inicializa navigate

  useEffect(() => {
    // Ahora carga las categorías desde el API
    getAllCategorias().then(setCategorias).catch(() => setCategorias([]));
  }, []);

  const manejarCambioArchivo = (e) => {
    if (e.target.files.length > 0) {
      setArchivoNombre(`Archivo seleccionado: ${e.target.files[0].name}`);
    } else {
      setArchivoNombre('');
    }
  };

  const agregarCategoria = async () => {
    if (!nuevoNombre.trim()) {
      alert('El nombre de la categoría es obligatorio');
      return;
    }
    const nombre = nuevoNombre.trim();

    // Verifica si ya existe en la lista actual
    const existe = categorias.some(c => (typeof c === 'string' ? c === nombre : c.nombre === nombre));
    if (existe) {
      alert('La categoría ya existe');
      return;
    }

    try {
      // Llama al API para crear la categoría
      const nuevaCategoria = await createCategoria({ nombre, descripcion: nuevaDescripcion.trim() });
      setCategorias([...categorias, nuevaCategoria]);
      setCategoriaSeleccionada(nuevaCategoria.nombre.toLowerCase().replace(/\s+/g, '-'));
      setNuevoNombre('');
      setNuevaDescripcion('');
      setModalAbierto(false);
    } catch (error) {
      alert('Error al crear la categoría');
    }
  };

  const borrarCategoria = async () => {
    if (!categoriaSeleccionada) {
      alert('Selecciona una categoría para borrar');
      return;
    }

    // Busca la categoría seleccionada en el array de objetos
    const categoriaObj = categorias.find(c => {
      const nombre = typeof c === 'string' ? c : c.nombre;
      return nombre.toLowerCase().replace(/\s+/g, '-') === categoriaSeleccionada;
    });

    if (!categoriaObj) {
      alert('Categoría no encontrada');
      return;
    }

    const confirmacion = window.confirm(`¿Estás seguro de borrar la categoría "${categoriaObj.nombre || categoriaObj}"?`);
    if (!confirmacion) return;

    // Si la categoría tiene un id (es del API), bórrala del API
    if (categoriaObj.id) {
      try {
        await deleteCategoria(categoriaObj.id);
        setCategorias(categorias.filter(c => c.id !== categoriaObj.id));
        setCategoriaSeleccionada('');
      } catch (error) {
        alert('Error al borrar la categoría');
      }
    } else {
      // Si es local (no debería pasar ya), solo bórrala del estado
      setCategorias(categorias.filter(c => c !== categoriaObj));
      setCategoriaSeleccionada('');
    }
  };

  // NUEVO: Manejar el submit del formulario
  const handleCrearProducto = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombreRef.current.value.trim() ||
        !presentacionRef.current.value.trim() ||
        !categoriaSeleccionada ||
        !descripcionRef.current.value.trim() ||
        !stockRef.current.value.trim()) {
      alert('Completa todos los campos');
      return;
    }

    // Busca el objeto de la categoría seleccionada
    const categoriaObj = categorias.find(c => {
      const nombre = typeof c === 'string' ? c : c.nombre;
      return nombre.toLowerCase().replace(/\s+/g, '-') === categoriaSeleccionada;
    });

    try {
      await crearProducto({
        name: nombreRef.current.value.trim(),
        unit: presentacionRef.current.value.trim(),
        categoriaId: categoriaObj?.id,
        descripcion: descripcionRef.current.value.trim(),
        stock: Number(stockRef.current.value),
        // Puedes agregar aquí la lógica para la imagen si la necesitas
      });
      navigate('/Listado_Productos'); // Redirige al listado
    } catch (error) {
      alert('Error al crear el producto');
    }
  };

  return (
    <main>
      <h1>Agregar un producto</h1>
      <div className="container agregar-flex-container">
        <article className="agregar-form-col">
          <form onSubmit={handleCrearProducto}>
            <label htmlFor="nombre">Nombre del producto</label>
            <input type="text" id="nombre" name="nombre" placeholder="Nombre del producto" required ref={nombreRef} />

            <label htmlFor="presentacion">Presentación</label>
            <input type="text" id="presentacion" name="presentacion" placeholder="Presentación" required ref={presentacionRef} />

            <label htmlFor="categoria">Categoría</label>
            <div className="categorias">
              <select
                id="categoria"
                name="categoria"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                required
              >
                <option disabled value="">Seleccione la categoría del producto</option>
                {categorias.map((c, i) => {
                  const nombre = typeof c === 'string' ? c : c.nombre;
                  return (
                    <option key={i} value={nombre.toLowerCase().replace(/\s+/g, '-')}>{nombre}</option>
                  );
                })}
              </select>
              <button type="button" className="boton_agregar" onClick={() => setModalAbierto(true)}>+</button>
              <button type="button" className="boton_borrar" onClick={borrarCategoria}>🗑</button>
            </div>

            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" placeholder="Descripción del producto..." required ref={descripcionRef}></textarea>

            {/* Mueve aquí el input de stock y el botón */}
            <label id="TitleStock">Stock</label><br />
            <input type="number" id="stock" name="stock" placeholder="Stock" min="0" required ref={stockRef} />

            <button className="boton-crear" type="submit">Crear producto</button>
          </form>
        </article>

        <article className="agregar-img-col">
          <label>Imagen</label>
          <div className="imagen-zona">
            <p>Arrastra la imagen a esta zona</p>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={manejarCambioArchivo}
            />
            <button type="button" onClick={() => fileInputRef.current.click()}>Seleccionar imagen</button>
            <p>{archivoNombre}</p>
          </div>
        </article>
      </div>

      {modalAbierto && (
        <div id="modalCategoria" className="modal" onClick={(e) => {
          if (e.target.id === "modalCategoria") setModalAbierto(false);
        }}>
          <div className="modal-content">
            <h2>Nueva categoría</h2>
            <label>Nombre</label>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Nombre de la categoría"
            />
            <label>Descripción</label>
            <textarea
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
              placeholder="Descripción del producto..."
            />
            <button id="crearCategoriaBtn" onClick={agregarCategoria}>Crear categoría</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AgregarProducto;
