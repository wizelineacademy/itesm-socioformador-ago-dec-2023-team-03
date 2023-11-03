import img from '/public/images/chat-gpt-logo.svg.png';
import Image from 'next/image';
import { CgClose } from 'react-icons/cg';

const memberList = [
    { id : 1, name : "member ONE", email : "ONE@mail.com" },
    { id : 2, name : "member TWO", email : "TWO@mail.com" },
    { id : 3, name : "member THREE", email : "THREE@mail.com" },
    { id : 4, name : "member FOUR", email : "FOUR@mail.com" },
    { id : 5, name : "member FIVE", email : "FIVE@mail.com" },
    { id : 6, name : "member SIX", email : "SIX@mail.com" },
    { id : 7, name : "member SEVEN", email : "SEVEN@mail.com" },
    { id : 8, name : "member EIGHT", email : "EIGHT@mail.com" },
    { id : 9, name : "member NINE", email : "NINE@mail.com" },
    { id : 10, name : "member TEN", email : "TEN@mail.com" },
    { id : 11, name : "member ELEVEN", email : "ELEVEN@mail.com" },
    { id : 12, name : "member TWELVE", email : "TWELVE@mail.com" },
    { id : 13, name : "member THIRTEEN", email : "THIRTEEN@mail.com" },
    { id : 14, name : "member FOURTEEN", email : "FOURTEEN@mail.com" },
    { id : 15, name : "member FIFTEEN", email : "FIFTEEN@mail.com" },
    { id : 16, name : "member SIXTEEN", email : "SIXTEEN@mail.com" },
    { id : 17, name : "member SEVENTEEN", email : "SEVENTEEN@mail.com" },
    { id : 18, name : "member EIGHTEEN", email : "EIGHTEEN@mail.com" },
    { id : 19, name : "member NINETEEN", email : "NINETEEN@mail.com" },
    { id : 20, name : "member TWENTY", email : "TWENTY@mail.com" },
];

export default function AdminMembersList(){
    return(
        <ul className='flex-row overflow-y-scroll space-y-3 h-full p-4'>
            { memberList.map((item) => (
            <div key={item.id} className='flex w-full rounded-md px-2 py-3 items-center gap-3 bg-regal-blue hover:bg-regal-blue-light'>
                <div className="flex w-full gap-3 justify-between">
                    <Image 
                    className="rounded-full w-10 self-center" 
                    alt="placeholder member foto" 
                    src={img} 
                    />
                    <p className='bg-regal-blue-light self-center'>{item.name}</p>
                    <p className='bg-regal-blue-light self-center'>{item.email}</p>
                    <button className='flex bg-regal-blue-light rounded-md h-10 aspect-square justify-center items-center'>
                        <CgClose size={25}/>
                    </button>
                </div>
            </div>
            ))}
        </ul>
    )
}