import { useState } from "react";
import { LLM, Member } from "../../types";

interface LLLDetailsProps {
  llm?: LLM;
  close: () => void;
  addTokensToLLM: (event: any, llmId: string, quantity: number) => void;
}

export default function LLLDetails({ llm, close, addTokensToLLM }: LLLDetailsProps) {
/**
 * This component displays the details of a LLM.
 * @param {LLLDetailsProps} props - The props of the component.
 * @param {LLM} props.llm - The LLM object.
 * @param {function} props.close - Function to close the modal.
 * @returns {JSX.Element} JSX Element for the LLM details.
 */
  const [input, setInput] = useState<number>();
  /* const modalRef = useRef<null | HTMLDialogElement>(null); */

  /* Function to handle closing the modal */
  const handleClose = () => {
    close();
  }

  /**
   * Function to handle input change and round the value to the nearest 10.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value >= 10 && value % 10 !== 0) {
      value = Math.round(value / 10) * 10;
    }
    setInput(value);
  }

  const handleRemoveLLM = () => {
    throw new Error("Not implemented");
  }

  /* const openLLMModal = () => {
    modalRef.current?.showModal();
  }

  const closeLLMModal = () => {
    modalRef.current?.close();
  } */

  console.log(input);
  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">LLM Details</h1>
      </header>
      <div className="flex flex-col flex-grow h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal rounded-xl min-w-[20rem]">
        <div className="flex flex-row items-center justify-between p-2 bg-regal-blue-dark rounded-xl">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{llm?.name}</span>
            <span className="text-sm">{llm?.model}</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2">
          {/* Add tokens input (only 10 by 10) */}
          <input type="number" className="w-full px-3 py-2 bg-gray-400 rounded-xl placeholder-gray-500" placeholder="Even numbers (10 by 10)" min="10" value={input} onChange={handleInputChange} />
          <button onClick={(event) => addTokensToLLM(event, llm!.id, input!)} className="btn btn-neutral text-white bg-green-500 hover:bg-green-700">Add Tokens</button>
        </div>
      </div>
      <footer className="flex justify-around">
        <button onClick={handleRemoveLLM} className="btn btn-neutral text-white bg-red-500 hover:bg-red-700">Remove LLM</button>
        <button onClick={handleClose} className="btn btn-neutral text-white">Close</button>
      </footer>
      {/* <dialog ref={modalRef} className="py-3 px-14 rounded-2xl space-y-4">
        <Modal title="Warning" message="Are you sure you want to delete this LLM?" close={close} />
      </dialog> */}
    </>
  );
}
