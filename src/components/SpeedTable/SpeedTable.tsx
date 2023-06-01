import './speedTable.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { SpeedLimit, Train } from "../../types/TrainInterface";
import { SpeedRow } from "./SpeedRow";
import { useAppDispatch } from "../../store/hooks/redux";
import { trainSlice } from "../../store/reducers/TrainSlice";

interface SpeedTableProps {
    train: Train
}

export const SpeedTable = ({train}: SpeedTableProps) => {
    const { name, speedLimits } = train
    console.log(name)
    console.log('speed', speedLimits)

    const [formValue, setFormValue] = useState<SpeedLimit[]>([...speedLimits])
    console.log('formValue', formValue)
    const dispatch = useAppDispatch()

    const onChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        target.value = target.value.replace(/\D/g, '')

        formValue.map((speed) => {
            if (speed.name === target.name) {
                return {
                    ...speed,
                    speedLimit: +target.value
                }
            }
            return speed
        } )
    }

    const onSubmitChanges = (event: FormEvent) => {
        event.preventDefault()
        try {
            dispatch(trainSlice.actions.trainSpeedUpdated())
            console.log(formValue)
            setFormValue(formValue.sort((a, b) => a.speedLimit > b.speedLimit ? 1 : -1))

            const editedTrain = {
                ...train,
                speedLimits: [...formValue]
            }

            console.log(editedTrain)
            dispatch(trainSlice.actions.trainSpeedUpdatedSuccess(formValue))
        } catch (e: any) {
            console.log(e)
            dispatch(trainSlice.actions.trainSpeedUpdatedFailed(e.message))
        }
    }

    useEffect(() => {
        setFormValue([...speedLimits])
    },[speedLimits])

    return (
        <form className='table' onSubmit={onSubmitChanges}>
            <h2>{name}</h2>
            <div>
                {formValue.map((speed) => (
                    <SpeedRow key={speed.name} speed={speed} onChangeSpeed={onChangeSpeed} />
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