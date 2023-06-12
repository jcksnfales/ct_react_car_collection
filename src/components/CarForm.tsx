import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseNickname, chooseMake, chooseModel, chooseYear, chooseMileage } from "../redux/slices/RootSlice"

interface ContactFormProps {
    id?: string[]
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data:any, event:any) => {
    console.log(`ID: ${props.id}`)

    if (props.id && props.id.length > 0) { // we need props.id.length > 0 here because an empty array is NOT FALSEY (unlike python)
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${data} ${props.id}`)
      setTimeout(() => {window.location.reload()}, 1000)
      event.target.reset()
    } else {
      // use dispatch to update our state in our store
      dispatch(chooseNickname(data.nickname))
      dispatch(chooseMake(data.make))
      dispatch(chooseModel(data.model))
      dispatch(chooseYear(data.year))
      dispatch(chooseMileage(data.mileage))

      server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 1000)
    }
  }

  return (
    // TODO - add Handle function
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="nickname">Nickname</label>
            <Input {...register('nickname')} name="nickname" placeholder="nickname"/>
        </div>
        <div>
            <label htmlFor="make">Make</label>
            <Input {...register('make')} name="make" placeholder="make"/>
        </div>
        <div>
            <label htmlFor="model">Model</label>
            <Input {...register('model')} name="model" placeholder="model"/>
        </div>
        <div>
            <label htmlFor="year">Production Year</label>
            <Input {...register('year')} name="year" placeholder="year"/>
        </div>
        <div>
            <label htmlFor="mileage">Mileage</label>
            <Input {...register('mileage')} name="mileage" placeholder="mileage"/>
        </div>
        <div className="flex p-1">
            <button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">
                Submit
            </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
