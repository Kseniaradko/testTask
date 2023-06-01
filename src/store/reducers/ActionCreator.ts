import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrains = createAsyncThunk(
    'trains/fetchAll',
    async(url: string, thunkAPI) => {
        try {
            const response = await fetch(url)
            return await response.json()
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить данные. Попробуйте еще раз немного позже.')
        }
    }
)