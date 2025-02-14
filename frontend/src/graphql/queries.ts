import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $name: String!, $price: Float!) {
    updateProduct(id: $id, name: $name, price: $price) {
      id
      name
      price
    }
  }
`
