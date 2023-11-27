import { useState } from "react";
import { LLM } from "../../types";

interface LLLDetailsProps {
  llm?: LLM;
  close: () => void;
}

export default function LLLDetails({ llm, close }: LLLDetailsProps) {
  const [input, setInput] = useState<number>();
  const handleClose = () => {
    close();
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value >= 10 && value % 10 !== 0) {
      value = Math.round(value / 10) * 10;
    }
    setInput(value);
    console.log(value);
  }

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
          <button className="btn btn-neutral text-white bg-green-500 hover:bg-green-700">Add Tokens</button>
        </div>
      </div>
      <button onClick={handleClose} className="btn btn-neutral text-white w-full">Close</button>
    </>
  );
}
