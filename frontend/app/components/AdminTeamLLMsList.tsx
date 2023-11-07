import img from '/public/images/chat-gpt-logo.svg.png';
import Image from 'next/image';
import { CgClose, CgMathPlus } from 'react-icons/cg';
import AdminListDeleteButton from './AdminListDeleteButton';

const llmsList = [
    {id : 1, name : 'gpt3'},
    {id : 2, name : 'gpt4'},
    {id : 3, name : 'bard'},
    {id : 1, name : 'gpt3'},
    {id : 2, name : 'gpt4'},
    {id : 3, name : 'bard'},
    {id : 1, name : 'gpt3'},
    {id : 2, name : 'gpt4'},
    {id : 3, name : 'bard'},
    {id : 1, name : 'gpt3'},
    {id : 2, name : 'gpt4'},
    {id : 3, name : 'bard'},
    {id : 99, name : 'FIN'},
];

export default function AdminTeamLLMsList(){
    return(
        <>
            <div>
                <button className='flex bg-green-600 hover:bg-green-500 rounded-md w-10 aspect-square justify-self-center justify-center items-center'>
                    <CgMathPlus size={25}/>
                </button>
            </div>
            

            <ul className='grid grid-cols-4 gap-3 h-full p-5 overflow-y-auto bg-regal-blue-normal'>
                
                { llmsList.map((item) => (
                <div key={item.id} className='grid grid-flow-row auto-rows gap-4 rounded-md px-2 py-3 h-fit bg-regal-blue hover:bg-regal-blue-light'>
                    <Image 
                    className="rounded-full w-2/3 justify-self-center" 
                    alt="placeholder llm logo" 
                    src={img} 
                    />
                    <p className='bg-regal-blue-light justify-self-center'>{item.name}</p>
                    <AdminListDeleteButton/>
                </div>
                ))}
                
            </ul>
        </>
    )
}