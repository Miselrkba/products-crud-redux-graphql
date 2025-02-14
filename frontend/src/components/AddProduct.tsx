import type React from "react";
import { useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { GET_PRODUCTS } from "../graphql/queries"

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Float!) {
    createProduct(name: $name, price: $price) {
      id
      name
      price
    }
  }
`

const AddProduct: React.FC = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const priceFloat = parseFloat(price)
    if (!name || isNaN(priceFloat)) return
    try {
      await createProduct({ variables: { name, price: priceFloat } })
      setName("")
      setPrice("")
    } catch (err) {
      console.error("Error creating product:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="number"
        placeholder="Product price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  )
}

export default AddProduct
