import { CgClose } from "react-icons/cg";

export default function AdminListDeleteButton() {
    return(
        <button className='flex bg-red-600 hover:bg-red-500 rounded-md h-10 justify-self-center aspect-square justify-center items-center'>
            <CgClose size={25}/>
        </button>
    )
}