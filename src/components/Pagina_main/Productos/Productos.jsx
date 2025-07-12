import { useState, useEffect } from 'react';
import ProductoCard from './ProductoCard/ProductoCard';
import './Productos.css';
import { useSearch } from '../../../../src/context/SearchContext.jsx';

const Productos = () => {
    const [productos, setProductos] = useState([]);

    const { searchTerm } = useSearch();
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [sortBy, setSortBy] = useState('default');

    const categorias = [
        'Todas',
        'Frutas y Verduras',
        'Carnes, aves y pescados',
        'Abarrotes',
        'Panadería',
        'Congelados',
        'Lácteos y huevos',
        'Queso y fiambres'
    ];

    const sortOptions = [
        { value: 'default', label: 'Ordenar por' },
        { value: 'price-asc', label: 'Precio: Menor a mayor' },
        { value: 'price-desc', label: 'Precio: Mayor a menor' },
        { value: 'name-asc', label: 'Nombre: A-Z' },
        { value: 'name-desc', label: 'Nombre: Z-A' }
    ];

    useEffect(() => {
        // Obtener productos del backend al montar el componente
        fetch('https://backend-cloud-5bym.onrender.com/productos')
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al obtener productos:', err));
    }, []);

    useEffect(() => {
        let filtered = [...productos];
        if(selectedCategory !== 'Todas') {
            filtered = filtered.filter(producto => producto.categoria === selectedCategory);
        }
        if(searchTerm) {
            filtered = filtered.filter(producto => 
                producto.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        filtered.sort((a, b) => {
            const priceA = parseFloat(a.precioConDescuento.split(' ')[0]);
            const priceB = parseFloat(b.precioConDescuento.split(' ')[0]);
            switch(sortBy) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
        setFilteredProductos(filtered);
    }, [searchTerm, selectedCategory, sortBy, productos]);

    return (
        <main className="mainProductoCard">
            <aside className="category-filter">
                <h3>Filtrar por categoría</h3>
                <div className="category-buttons">
                    {categorias.map(categoria => (
                        <button
                            key={categoria}
                            className={selectedCategory === categoria ? 'active' : ''}
                            onClick={() => setSelectedCategory(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>
            </aside>

            <div className="content-wrapper">
                <div className="controls-container">                    
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                <section className="product-list">
                {filteredProductos.map(producto => 
                    <ProductoCard 
                        key={producto.id}
                        {...producto}
                    />
                )}
                </section>
            </div>
        </main>
    )
}

export default Productos;