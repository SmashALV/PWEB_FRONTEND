import { useEffect, useState } from 'react';
import { getProductos } from '../../../api/productosApi.js';
import './Most_Sold.css';
import { useCart } from '../../../context/CartContext.jsx';

export default function MostSold() {
    const { addItem } = useCart();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos().then(setProductos).catch(() => setProductos([]));
    }, []);

    const handleAddClick = (prod) => {
        setSelectedProduct(prod);
        setQuantity(1);
        setShowMenu(true);
    };

    const handleConfirm = () => {
        addItem(selectedProduct, quantity);
        setShowMenu(false);
        setSelectedProduct(null);
    };

    return (
        <section className="mostsold-section">
            <h2 className="mostsold-title">Lo más vendido</h2>
            <div className="mostsold-grid">
                {productos.map((prod) => (
                    <div className="mostsold-card" key={prod.id}>
                        <div className="mostsold-img-container">
                            <img src={prod.img} alt={prod.name} />
                        </div>
                        <h4 className="mostsold-name">{prod.name}</h4>
                        <p className="mostsold-price">S/ {prod.precioConDescuento || prod.price}</p>
                        <button
                            className='mostsold-btn'
                            onClick={() => handleAddClick(prod)}
                        >
                            Agregar
                        </button>
                    </div>
                ))}
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
        </section>
    );
}
