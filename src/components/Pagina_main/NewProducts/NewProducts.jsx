import React, { useState, useEffect } from "react";
import './NewProducts.css'; 
import { useCart } from "../../../context/CartContext";

import { getProductos } from '../../../api/productosApi';

function NewProducts() {
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
    <section className="newproducts-section">
      <h2 className="newproducts-title">Productos nuevos</h2>
      <div className="newproducts-grid">
        {productos.map((product) => (
          <div className="newproduct-card" key={product.id}>
            <div className="newproduct-img-container">
              <img src={product.img} alt={product.name} />
            </div>
            <h4 className="newproduct-name">{product.name}</h4>
            <p className="newproduct-price">S/ {product.precioConDescuento || product.price}</p>
            <button
              className='bton_Agregar'
              onClick={() => handleAddClick(product)}
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

export default NewProducts;