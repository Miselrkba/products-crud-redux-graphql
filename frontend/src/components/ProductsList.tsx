import type React from "react"
import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { DELETE_PRODUCT, GET_PRODUCTS } from "../graphql/queries"
import styles from "../styles/Delete.module.less"
import EditProduct from "./EditProduct"

const ProductsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } })
    } catch (err) {
      console.error("Error deleting product:", err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log("data", data.products)

  return (
    <div>
      <h2>Products List</h2>
      <ul>
        {data.products.map(
          (product: { id: string; name: string; price: number }) => (
            <li key={product.id} style={{ marginBottom: "1rem" }}>
              {editingId === product.id ? (
                <EditProduct
                  product={product}
                  onClose={() => setEditingId(null)}
                />
              ) : (
                <>
                  <span>
                    {product.name} - {product.price} €
                  </span>
                  <button
                    onClick={() => setEditingId(product.id)}
                    style={{ marginLeft: "1rem" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

export default ProductsList
