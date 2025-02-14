// src/pages/ProductsPage.tsx
import type React from "react";
import { useEffect } from "react"
import { fetchProducts } from "../features/products/productsSlice"
import "../styles/Products.less"
import { useAppDispatch, useAppSelector } from "../app/hooks";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) return <div>Načítavam...</div>
  if (error) return <div>Chyba: {error}</div>

  return (
    <div className="products-page">
      <h1>Produkty</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} €
          </li>
        ))}
      </ul>
      {/* Pridaj formulár pre vytvorenie produktu alebo tlačidlá pre update a delete */}
    </div>
  )
}

export default ProductsPage
