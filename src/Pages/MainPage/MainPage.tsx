import {useCallback, useEffect, useState} from "react";
import {TrainTable} from "../../components/TrainTable/TrainTable";
import {SpeedTable} from "../../components/SpeedTable/SpeedTable";
import './MainPage.css'
import {Train} from "../../types/TrainInterface";
import {fetchTrains} from "../../store/reducers/ActionCreator";
import {BASE_URL} from "../../constants/baseURL";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";

export const MainPage = () => {
    const dispatch = useAppDispatch()
    const { trains, isLoading, error } = useAppSelector(state => state.trainReducer)

    const [selectedTrain, setSelectedTrain] = useState<Train | null>(null)

    const openSpeedTable = useCallback((name: string) => {
        if (selectedTrain && selectedTrain.name === name) {
            setSelectedTrain(null)
            return
        }

        const item = trains.filter((train) => train.name === name)
        setSelectedTrain(item[0])
    }, [selectedTrain, trains])

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
                    <SpeedTable train={selectedTrain}/>
                </div>
            )}
        </div>
    )
}