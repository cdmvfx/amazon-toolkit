import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState, AppThunk } from '../../app/store'

export interface UserProducts {
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
	products: UserProduct[]
}

export interface UserProduct {
	uid: string,
	name: string,
	asin: string,
	shopify_variant_id: string
}

const initialState: UserProducts = {
	status: 'idle',
	error: null,
	products: []
}

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = 'Failed';
			})
	}
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	
	return await axios.get('/api/products')
		.then((res) => {
			return res.data.payload;
		})
		.catch((err) => {
			return `fetchProducts failed to get products ${err}`;
		})
})


export const selectProducts = (state: AppState) => state.products

export default productsSlice.reducer