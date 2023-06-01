import {SpeedLimit} from "../../types/TrainInterface";
import {ChangeEvent} from "react";
import './speedTable.css';


interface SpeedRowProps {
    speed: SpeedLimit;
    onChangeSpeed: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SpeedRow = ({ speed, onChangeSpeed }: SpeedRowProps) => {
    const { name, speedLimit } = speed

    return (
        <div className='speed_row'>
            <div className='speed_cell'>{name}</div>
            <input
                name={name}
                defaultValue={speedLimit}
                onChange={onChangeSpeed}
            />
        </div>
    )
}