import {Train} from "../MainPage/MainPage";
import './speedTable.css'
import {FormEvent} from "react";

interface SpeedTableProps {
    train: Train
}

export const SpeedTable = ({train}: SpeedTableProps) => {
    const { name, speedLimits } = train
    let formValue = [...speedLimits]

    const validateInput = (el: any) => {
        return el.target.value = el.target.value.replace(/[^0-9]/g, '');
    }

    const onChangeSpeed = (event: FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event

        formValue.map((speed) => {
            if (speed.name === currentTarget.name) {
                speed.speedLimit = +currentTarget.value
            }
        } )
    }

    const onSubmitChanges = (event: FormEvent) => {
        event.preventDefault()
        try {
            formValue = formValue.sort((a, b) => a.speedLimit > b.speedLimit ? 1 : -1)

            const editedTrain = {
                ...train,
                speedLimits: [...formValue]
            }

            console.log(editedTrain)
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <form className='table' onSubmit={onSubmitChanges}>
            <h2>{name}</h2>
            <div>
                {formValue.map((speed) => (
                    <div key={speed.name} className='speed_row'>
                        <div className='speed_cell'>{speed.name}</div>
                        <input
                            name={speed.name}
                            defaultValue={speed.speedLimit}
                            onChange={onChangeSpeed}
                            onInput={validateInput}
                        />
                    </div>
                ))}
            </div>
            <button
                type='submit'
            >
                Сохранить
            </button>
        </form>
    )
}