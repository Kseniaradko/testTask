import {Train} from "../MainPage/MainPage";
import './TrainTable.css'

interface TrainTableProps {
    trains: Train[];
    openSpeedTable: (name: string) => void
}

export const TrainTable = ({trains, openSpeedTable}: TrainTableProps) => {

    return (
        <div>
            <h1>Список поездов</h1>
            <div>
                {trains.map((train) => (
                    <div key={train.name} className='table_row'>
                        <div
                            className='table_cell'
                            onClick={() => openSpeedTable(train.name)}
                        >
                            {train.name}
                        </div>
                        <div className='table_cell'>{train.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}