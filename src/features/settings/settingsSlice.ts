import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

import type { AppState, AppThunk } from '../../app/store'

export interface SettingsState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
	settings: any
}

const initialState: SettingsState = {
	status: 'idle',
	error: null,
	settings: {}
}

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder
			.addCase(fetchSettings.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchSettings.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.settings = action.payload;
			})
			.addCase(fetchSettings.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(editSettings.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.settings = action.payload.settings;
			})
	}
})

export const editSettings = createAsyncThunk('settings/editSettings', async (settings) => {


	const res = await axios.post('/api/settings', settings)
		.then((res) => res.data)
		.catch((err) => console.error(err) )

	return res;
})

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
	const response = await axios.get('/api/settings')
		.then((res) => {
			console.log('Settings fetched.', res.data);
			return res.data.payload;
		})
		.catch((err) => {
			console.error('Failed to fetch settings.', err);
			return `fetchSettings failed to get settings ${err}`;
		})
	return response;
})


export const selectSettings = (state: AppState) => state.settings.settings

export default settingsSlice.reducer