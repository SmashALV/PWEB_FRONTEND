import './Producto.css' 
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getProductos, getSimilarProductos } from '../../../api/productosApi.js';
import Chip from '../Chip/Chip.jsx';
import { useCart } from '../../../context/CartContext.jsx'; 

const Producto = () => {

    const params = useParams()
    const productoId = params.productoId; 

    const defaultProducto = {
        id: 0,
        nombre: '',
        categoria: "",
        precioConDescuento: 0,
        precio: 0,
        descripcion: "",
        img: '',
        stock: 0
    }
    
    const [producto, setProducto] = useState(defaultProducto)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductos()
            .then(productos => {
                const rawProducto = productos.find(g => String(g.id) === String(productoId));
                setProducto(rawProducto || defaultProducto);
            })
            .catch(() => setProducto(defaultProducto));

        getSimilarProductos(productoId)
            .then(similarProducts => setProducts(similarProducts))
            .catch(() => setProducts([]));
    }, [productoId]);

    const { addItem } = useCart();
    const [showMenu, setShowMenu] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);

    const handleAddClick = () => {
        setQuantity(1);
        setShowMenu(true);
    };

    const handleConfirm = () => {
        if (quantity > producto.stock) {
            setShowAlert(true);
            return;
        }
        const product = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precioConDescuento || producto.precio,
            img: producto.img,
        };
        addItem(product, quantity);
        setShowMenu(false);
    };
    

    // Eliminado array estático de productos. Usa solo datos del backend.

    return (
        <>  
            <section>
                Supermercado - Frutas
            </section>
            <section className="sectionProducto"> 
            <div className="image-container">
                <img 
                    src={producto.img} 
                    alt={producto.name} 
                    className="product-image"
                />
            </div>

            <div className="info-container">
                <div className="top-section">
                    <h2 className="product-title">{producto.name}</h2>
                    <div className="tags">
                        <div>Presentacion</div>
                        <span className="category">{producto.publisher}</span>
                        <span className="genre">{producto.genero}</span>
                    </div>
                    <ul className="features-list">
                        {producto.caracteristicas?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {}
                <div className="bottom-section">
                    <h3 className="description-title">Descripción:</h3>
                    <p className="product-description">{producto.descripcion}</p>
                    
                    <div className="price-container">
                        <span className="price">S/ {producto.precioConDescuento}</span>
                        <button className="similar-btn" onClick={handleAddClick}>Agregar al carrito</button>
                    </div>
                    {showMenu && (
                        <div className="cantidad-menu">
                            <div className="cantidad-menu-content">
                                <h4>¿Cuántos deseas llevar?</h4>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                    style={{ width: "60px", marginRight: "10px" }}
                                />
                                <button onClick={handleConfirm}>Confirmar</button>
                                <button onClick={() => setShowMenu(false)}>Cancelar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
        <section>
        </section>
                    <section className="similar-products">
            <h2 className="similar-title">Productos similares</h2>
            <div className="similar-grid">
                {products.map((product) => (
                    <div className="similar-card" key={product.id}>
                        <div className="similar-img-container">
                            <img
                                src={product.image}
                                alt={product.name}
                            />
                        </div>
                        <div className="similar-info">
                            <h4 className="similar-name">{product.name}</h4>
                            <div className="similar-category">Frutas y verduras</div>
                            <div className="similar-price">S/{product.price} X KG</div>
                            <button className="similar-btn">AGREGAR</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        {showAlert && (
            <div className="alert-overlay">
                <div className="alert-box">
                    <p>No hay suficiente stock para agregar esta cantidad al carrito.</p>
                    <button onClick={() => setShowAlert(false)}>Cerrar</button>
                </div>
            </div>
        )}
        </>
    )
}

export default Producto