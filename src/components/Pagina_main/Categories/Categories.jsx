import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { getAllCategorias } from '../../../api/CategoriasApi';
import './Categories.css';

export default function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategorias().then(setCategories).catch(() => setCategories([]));
    }, []);

    const handleCategoryClick = (catName) => {
        navigate('/productos');
    };

    return (
        <section className="categories-section">
            <h2 className="categories-title">Explora las categorías</h2>
            <div className="categories-grid">
                {categories.map((cat) => (
                    <div 
                        className="category-card" 
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.nombre)}
                    >
                        <div className="category-img-container">
                            <img 
                                src={cat.img || cat.image} 
                                alt={cat.nombre || cat.name} 
                            />
                        </div>
                        <p className="category-name">
                            {cat.nombre || cat.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}