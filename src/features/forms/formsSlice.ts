import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppState, AppThunk } from '../../app/store'
import { ReviewForm } from '../../types/ReviewForm'


export interface ReviewFormState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
	forms: ReviewForm[]
}

const initialState: ReviewFormState = {
	status: 'idle',
	error: null,
	forms: []
}

export const formsSlice = createSlice({
	name: "forms",
	initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder
			.addCase(fetchForms.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchForms.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.forms = action.payload;
			})
			.addCase(fetchForms.rejected, (state, action) => {
				state.status = 'failed';
				state.error = 'Failed';
			})
			.addCase(editForm.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.forms = action.payload.settings;
			})
	}
})

export const editForm = createAsyncThunk('settings/editForm', async (settings) => {

	const res = await axios.post('/api/forms', settings)
		.then((res) => res.data)
		.catch((err) => console.error(err) )

	return res;
})

export const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
	const response = await axios.get('/api/forms')
		.then((res) => {
			console.log('Forms fetched.', res.data);
			return res.data.payload;
		})
		.catch((err) => {
			console.error('Failed to fetch forms.', err);
			return `fetchForms failed to get forms ${err}`;
		})
	return response;
})


export const selectForms = (state: AppState) => state.forms.forms

export default formsSlice.reducer