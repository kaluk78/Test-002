// src/components/ProductListComponent.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchProducts } from "../services/ProductService";

// Placeholder style class to be refactored
const placeholderClass = "bg-gray-200 animate-pulse";

export const ProductListComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <div key={i} className={`h-24 ${placeholderClass}`}>Loading...</div>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4">
          <h3>{p.name || "Product Name Placeholder"}</h3>
          <p>{p.description || "Description Placeholder"}</p>
          <span>${p.price}</span>
        </div>
      ))}
    </div>
  );
};
