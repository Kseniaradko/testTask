import { useCallback, useEffect } from "react";
import { TrainTable } from "../../components/TrainTable/TrainTable";
import { SpeedTable } from "../../components/SpeedTable/SpeedTable";
import { fetchTrains } from "../../store/reducers/ActionCreator";
import { BASE_URL } from "../../constants/baseURL";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { trainSlice } from "../../store/reducers/TrainSlice";
import './MainPage.css'

export const MainPage = () => {
    const dispatch = useAppDispatch()
    const { trains, isLoading, error } = useAppSelector(state => state.trainReducer)
    const selectedTrain = useAppSelector(state => state.trainReducer.selectedTrain)

    const openSpeedTable = useCallback((name: string) => {
        if (selectedTrain && selectedTrain.name === name) {
            dispatch(trainSlice.actions.selectTrain(null))
            return
        }

        const item = trains.filter((train) => train.name === name)[0]
        dispatch(trainSlice.actions.selectTrain(item))

    }, [dispatch, selectedTrain, trains])

    useEffect(() => {
        dispatch(fetchTrains(BASE_URL))
    }, [dispatch])

    return (
        <div className='main_page'>
            {isLoading && <div>Идет загрузка...</div>}
            {error && <div>Произошла ошибка в загрузке данных, повторите попытку позже!</div>}
            {trains && trains.length > 0 && <TrainTable trains={trains} openSpeedTable={openSpeedTable}/>}
            {selectedTrain && (
                <div className='speed_table'>
                    <SpeedTable />
                </div>
            )}
        </div>
    )
}