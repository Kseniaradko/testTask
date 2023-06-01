import { Train } from "../../types/TrainInterface";
import './TrainTable.css';

interface TrainRowProps {
    train: Train
    openSpeedTable: (name: string) => void
}

export const TrainRow = ({ train, openSpeedTable }: TrainRowProps) => {
    return (
        <div className='table_row'>
            <div
                className='table_cell'
                onClick={() => openSpeedTable(train.name)}
            >
                {train.name}
            </div>
            <div className='table_cell'>{train.description}</div>
        </div>
    )
}