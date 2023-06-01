import { SpeedLimit } from "../../types/TrainInterface";
import { ChangeEvent, useEffect, useState } from "react";
import './speedTable.css';


interface SpeedRowProps {
    speed: SpeedLimit;
    onChangeSpeed: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SpeedRow = ({ speed, onChangeSpeed }: SpeedRowProps) => {
    const { name, speedLimit } = speed
    const [inputValue, setInputValue] = useState<number>(speedLimit)

    const onChangeSpeedWrapper = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(+event.target.value)
        onChangeSpeed(event)
    }

    useEffect(() => {
        setInputValue(speedLimit)
    }, [speedLimit])

    return (
        <div className='speed_row'>
            <div className='speed_cell'>{name}</div>
            <input
                name={name}
                value={inputValue}
                onChange={onChangeSpeedWrapper}
            />
        </div>
    )
}