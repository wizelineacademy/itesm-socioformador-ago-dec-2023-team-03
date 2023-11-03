import img from '/public/images/chat-gpt-logo.svg.png';
import Image from 'next/image';
import { CgClose } from 'react-icons/cg';

export default function AdminMembersList(){
    return(
        <ul className='flex-row overflow-y-scroll space-y-3 h-full p-4'>
            {new Array(20).fill({name:"user",mail:"user mail"}).map((item, idx) => (
            <div key={idx} className='flex w-full rounded-md px-2 py-3 items-center gap-3 bg-regal-blue hover:bg-regal-blue-light'>
                <div className="flex w-full gap-3 justify-between">
                    <Image 
                    className="rounded-full w-10 self-center" 
                    alt="placeholder member foto" 
                    src={img} 
                    />
                    <p className='bg-regal-blue-light self-center'>{item.name}</p>
                    <p className='bg-regal-blue-light self-center'>{item.mail}</p>
                    <button className='flex bg-regal-blue-light rounded-md h-10 aspect-square justify-center items-center'>
                        <CgClose size={25}/>
                    </button>
                </div>
            </div>
            ))}
        </ul>
    )
}