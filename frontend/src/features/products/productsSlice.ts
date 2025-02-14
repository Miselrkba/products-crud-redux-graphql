// src/features/products/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { gql } from "@apollo/client"
import { client } from "../../app/apolloClient"

export interface Product {
  id: string
  name: string
  price: number
}

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
}

// --- FETCH (Read) ---
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const GET_PRODUCTS = gql`
      query GetProducts {
        products {
          id
          name
          price
        }
      }
    `
    try {
      const response = await client.query({ query: GET_PRODUCTS })
      return response.data.products as Product[]
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching products")
    }
  },
)

// --- CREATE ---
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: Omit<Product, "id">, thunkAPI) => {
    const CREATE_PRODUCT = gql`
      mutation CreateProduct($name: String!, $price: Float!) {
        createProduct(name: $name, price: $price) {
          id
          name
          price
        }
      }
    `
    try {
      const response = await client.mutate({
        mutation: CREATE_PRODUCT,
        variables: newProduct,
      })
      return response.data.createProduct as Product
    } catch (error) {
      return thunkAPI.rejectWithValue("Error creating product")
    }
  },
)

// Podobne môžeš vytvoriť thunky pre UPDATE a DELETE operácie.

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Lokálne operácie (ak sú potrebné)
    // addProduct(state, action: PayloadAction<Product>) {
    //   state.products.push(action.payload)
    // },
  },
  extraReducers: builder => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      },
    )
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    // Create Product
    builder.addCase(
      createProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload)
      },
    )
    // Pridaj extraReducers pre update a delete podľa potreby
  },
})

export const { addProduct } = productsSlice.actions
export default productsSlice.reducer
