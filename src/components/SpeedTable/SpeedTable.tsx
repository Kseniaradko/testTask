import {ChangeEvent, FormEvent, useState} from "react";
import { SpeedLimit } from "../../types/TrainInterface";
import { SpeedRow } from "./SpeedRow";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {trainSlice} from "../../store/reducers/TrainSlice";
import './speedTable.css';

export const SpeedTable = () => {
    const train = useAppSelector(state => state.trainReducer.selectedTrain)

    const [formValue, setFormValue] = useState<SpeedLimit[]>(train ? [...train.speedLimits] : [])
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
        })
    }

    const onSubmitChanges = (event: FormEvent) => {
        event.preventDefault()
        try {
            dispatch(trainSlice.actions.trainSpeedUpdated())
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

    return (
        <form className='table' onSubmit={onSubmitChanges}>
            <h2>{train?.name}</h2>
            <div>
                {train?.speedLimits.map((speed) => (
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