import AddProduct from "../components/AddProduct"
import ProductsList from "../components/ProductsList"
import "../styles/Products.less"

const ProductsPage: React.FC = () => {
  return (
    <div className="products-page">
      <h1>Products</h1>
      <AddProduct />
      <ProductsList />
    </div>
  )
}

export default ProductsPage
