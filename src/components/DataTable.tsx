import {useState} from 'react'
import Modal from "./Modal"
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetData } from '../custom-hooks/FetchData'

const columns:GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 90},
  {field: 'nickname', headerName: 'Nickname', flex: 1},
  {field: 'make', headerName: 'Make', flex: 1},
  {field: 'model', headerName: 'Model', flex: 1},
  {field: 'prodyear', headerName: 'Year', flex: 1},
  {field: 'mileage', headerName: 'Mileage', flex: 1}
]

function DataTable() {
  const [open, setOpen] = useState(false);
  const {carsData, getData} = useGetData();
  const [selectionModel, setSelectionModel] = useState<string[]>([])

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  
  const deleteData = () => {
    server_calls.delete(selectionModel[0])
    getData()
    console.log(`Selection model: ${selectionModel}`)
    setTimeout(() => {window.location.reload()}, 500)
  }

  return (
    <>
        <Modal open={open} onClose={closeModal}/>
        <div className="flex flex-row">
            <div>
                <button className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"
                onClick={() => openModal()}>
                    Create New Contact
                </button>
            </div>
            <button onClick={openModal} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Update</button>
            <button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Delete</button>
        </div>
        <div className={open ? "hidden" : "container mx-10 my-5 flex flex-col"} style={{height:400, width:'100%'}}>
            <h2 className="p-3 bg-slate-300 my-2 rounded">My Cars</h2>
            <DataGrid rows={carsData} columns={columns} checkboxSelection={true} onRowSelectionModelChange={(item:any) => {setSelectionModel(item)}}/>
        </div>
    </>
  )
}

export default DataTable
