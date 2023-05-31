import {useEffect, useState} from "react";
import {TrainTable} from "../TrainTable/TrainTable";
import {SpeedTable} from "../SpeedTable/SpeedTable";
import './MainPage.css'

const BASE_URL = 'https://gist.githubusercontent.com/GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json'

export interface SpeedLimit {
    name: string;
    speedLimit: number
}

export interface Train {
    name: string;
    description: string;
    speedLimits: SpeedLimit[]
}

export const MainPage = () => {
    const [data, setData] = useState<Train[] | []>([])
    const [error, setError] = useState(null)
    const [selectedTrain, setSelectedTrain] = useState<Train | null>(null)

    const openSpeedTable = (name: string) => {
        if (selectedTrain && selectedTrain.name === name) {
            setSelectedTrain(null)
        } else {
            const item = data.filter((train) => train.name === name)
            setSelectedTrain(item[0])
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(BASE_URL)
            return response.json()
        } catch (e: any) {
            setError(e)
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData().then((res) => setData(res))
    }, [])

    return (
        <div className='main_page'>
            {error && <div>Произошла ошибка в загрузке данных, повторите попытку позже!</div>}
            {data && data.length > 0 && <TrainTable trains={data} openSpeedTable={openSpeedTable}/>}
            {selectedTrain && (
                <div className='speed_table'>
                    <SpeedTable train={selectedTrain}/>
                </div>
            )}
        </div>
    )
}