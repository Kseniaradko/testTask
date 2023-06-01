import {SpeedLimit, Train} from "../../types/TrainInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTrains} from "./ActionCreator";
import {RootState} from "../store";

interface TrainState {
    trains: Train[];
    selectedTrain: Train | null;
    isLoading: boolean;
    error: string;
}

const initialState: TrainState = {
    trains: [],
    selectedTrain: null,
    isLoading: false,
    error: ''
}

export const trainSlice = createSlice({
    name: 'trains',
    initialState,
    reducers: {
        trainSpeedUpdated(state) {
            state.isLoading = true;
        },
        trainSpeedUpdatedSuccess(state, action: PayloadAction<SpeedLimit[]>) {
            state.isLoading = false;
            state.trains = state.trains.map((train) => {
                train.speedLimits.map((speed) => {
                    action.payload.map((act) => {
                        if (speed.name === act.name) {
                            speed.speedLimit = act.speedLimit
                        }
                        return act
                    })
                    return speed
                })
                return train
            })
        },
        trainSpeedUpdatedFailed(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        selectTrain(state, action: PayloadAction<Train | null>) {
            state.selectedTrain = action.payload
        }
    },
    extraReducers: {
        [fetchTrains.fulfilled.type]: (state, action: PayloadAction<Train[]>) => {
            state.isLoading = false;
            state.trains = action.payload;
            state.error = '';
        },
        [fetchTrains.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTrains.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default trainSlice.reducer;