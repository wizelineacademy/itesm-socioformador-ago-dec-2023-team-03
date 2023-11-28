import useLLM from "@/src/hooks/useLLM";
import { LLM } from "@/src/types";
import { useEffect, useState } from "react";

interface AddLLMProps {
  close: () => void;
  groupId: string;
}

/**
 * This component is a modal to add a LLM to a specific team.
 * @param {AddLLMProps} props - The props of the component.
 * @param {function} props.close - Function to close the modal.
 * @param {string} props.groupId - ID of the group to add the LLM.
 * @returns {JSX.Element} JSX Element for the modal.
 */

export default function AddMLLM({ close, groupId }: AddLLMProps): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [llms, setLLMs, loadingLLMs] = useLLM(groupId);
  const [filteredLLMs, setFilteredLLMs] = useState<LLM[]>(llms);


  /* Effect hook to filter LLMs based on the input */
  useEffect(() => {
    const filteredLLMs = llms.filter((llm) => {
      const fullName = `${llm.name} ${llm.model}`;
      return fullName.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredLLMs(filteredLLMs);
  }, [input, llms]);

  /* Function to handle closing the modal */
  const handleClose = () => {
    setInput("");
    close();
  }

  if (loadingLLMs) return (
    <div className="flex flex-col w-full h-full items-center justify-center align-middle">
      <span className="loading loading-spinner loading-lg text-accent "></span>
    </div>
  );

  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">Add LLM</h1>
      </header>
      <input type="search" className="w-full px-3 py-2 bg-gray-400 rounded-xl" placeholder="Search..." value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex flex-col flex-grow h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal rounded-xl min-w-[20rem]">

        {
          filteredLLMs.length > 0 ? (
            filteredLLMs.map((llm) => (
              <div key={llm.id} className="flex flex-row items-center justify-between p-2 bg-regal-blue-dark rounded-xl">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{llm.name}</span>
                  <span className="text-sm">{llm.model}</span>
                </div>
                <button className="btn-sm btn btn-neutral text-white">Add</button>
              </div>
            ))
          ) : (
            <span className="text-center text-white">No hay coincidencias</span>
          )
        }
      </div>
      <button onClick={handleClose} className="btn btn-neutral text-white w-full">Close</button>
    </>
  );
}
