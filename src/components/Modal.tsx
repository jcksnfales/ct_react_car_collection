import CarForm from "./CarForm";

type Props = {
    id?: string[];
    open: boolean;
    funcClose: () => void;
    tableRefresh: () => Promise<void>;
}

const Modal = (props: Props) => {
    if (!props.open) return (<></>);
    return (
        <div onClick={props.funcClose} className="fixed w-full h-full flex overflow-auto z-1 justify-center align-middle bg-gray-300 bg-opacity-25">
            <div className="max-w-600px w-2/5 fixed flex z-1 mt-20 bg-white shadow-xl rounded" onClick={(e) => {e.stopPropagation()}}>
                <div className="w-full flex flex-col">
                    <div className="flex flex-row space-apart">
                        <p className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white" onClick={props.funcClose}>
                            X
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center mt-3 p-2">
                        <CarForm id={props.id} closeModal={props.funcClose} tableRefresh={props.tableRefresh}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
