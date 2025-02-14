import type React from "react";
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_PRODUCT, GET_PRODUCTS } from "../graphql/queries"

interface EditProductProps {
  product: {
    id: string
    name: string
    price: number
  }
  onClose: () => void
}

const EditProduct: React.FC<EditProductProps> = ({ product, onClose }) => {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(String(product.price))

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProduct({
      variables: {
        id: product.id,
        name,
        price: parseFloat(price),
      },
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}

export default EditProduct
