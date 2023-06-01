import { Train } from "../../types/TrainInterface";
import { TrainRow } from "./TrainRow";
import './TrainTable.css'

interface TrainTableProps {
    trains: Train[];
    openSpeedTable: (name: string) => void
}

export const TrainTable = ({ trains, openSpeedTable }: TrainTableProps) => {

    return (
        <div>
            <h1>Список поездов</h1>
            <div>
                {trains.map((train) => (
                    <TrainRow key={train.name} train={train} openSpeedTable={openSpeedTable}/>
                ))}
            </div>
        </div>
    )
}