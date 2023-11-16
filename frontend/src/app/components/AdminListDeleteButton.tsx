import { CgClose } from "react-icons/cg";

export default function AdminListDeleteButton() {
    return (
        <button className='flex bg-transparent hover:bg-red-500 rounded-xl h-6 w-6 justify-self-center aspect-circle justify-center items-center'>
            <CgClose size={12} />
        </button>
    )
}