import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseNickname, chooseMake, chooseModel, chooseYear, chooseMileage } from "../redux/slices/RootSlice"

interface ContactFormProps {
    id?: string[],
    closeModal: () => void,
    tableRefresh: () => Promise<void>
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data:any, event:any) => {
    console.log(`ID: ${JSON.stringify(data)}`)

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
      dispatch(chooseYear(data.prodyear))
      dispatch(chooseMileage(data.mileage))

      server_calls.create(store.getState())
      .then(() => {
        props.closeModal();
        props.tableRefresh();
      })
    }
  }

  const testFunc = () => {
    
  }

  return (
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
            <Input {...register('prodyear')} name="prodyear" placeholder="production year" type="number"/>
        </div>
        <div>
            <label htmlFor="mileage">Mileage</label>
            <Input {...register('mileage')} name="mileage" placeholder="mileage" type="number"/>
        </div>
        <div className="flex p-1">
            <button className="flex mx-auto px-5 p-2 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">
                Submit
            </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
