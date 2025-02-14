// src/pages/HomePage.tsx
import React from "react"
import { Link } from "react-router-dom"

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Domovská stránka</h1>
      <Link to="/products">Prejsť na produkty</Link>
    </div>
  )
}

export default HomePage
