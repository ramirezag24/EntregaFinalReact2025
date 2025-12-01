import React from "react";
import "./productsML.css"; // IMPORTANTE

export default function ProductsML({ products }) {
  return (
    <div className="ml-wrapper">

      {/* SIDEBAR */}
      <aside className="ml-sidebar">
        <h3 className="ml-title">Filtros</h3>

        <div className="ml-filter-box">
          <h4 className="ml-filter-title">Envío gratis</h4>
          <label className="ml-switch">
            <input type="checkbox" />
            <span className="ml-slider"></span>
          </label>
        </div>

        <div className="ml-filter-box">
          <h4 className="ml-filter-title">Precio</h4>
          <input type="number" placeholder="Mínimo" className="ml-input" />
          <input type="number" placeholder="Máximo" className="ml-input" />
        </div>

        <div className="ml-filter-box">
          <h4 className="ml-filter-title">Categoría</h4>
          <ul className="ml-list">
            <li>Accesorios (45)</li>
            <li>Electrónica (12)</li>
            <li>Ropa (23)</li>
          </ul>
        </div>
      </aside>

      {/* PRODUCT GRID */}
      <div className="ml-products-container">
        <h2 className="ml-header">Resultados</h2>

        {products.map((p) => (
          <div key={p.id} className="ml-product-card">
            <img src={p.image} alt={p.name} className="ml-product-img" />

            <div className="ml-product-info">
              {/* Título */}
              <h3 className="ml-product-name">{p.name}</h3>

              {/* Precio */}
              <p className="ml-price">${p.price}</p>

              {/* Envío */}
              <p className="ml-free">Envío gratis</p>

              {/* Descripción */}
              <p className="ml-desc">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
