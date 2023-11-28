"use client";
import { useState } from "react";

interface NewGroupProps {
  close: () => void;
  onSubmit: (event: React.FormEvent, teamName: string) => void;
}

/**
 * This component is a modal to create a new group.
 * @param {NewGroupProps} props - The props of the component.
 * @param {function} props.close - Function to close the modal.
 * @param {function} props.onSubmit - Function to handle the submit event.
 * @returns {JSX.Element} JSX Element for the modal.
 */

export default function NewGroup({
  close,
  onSubmit,
}: NewGroupProps) {
  const [input, setInput] = useState('');

  /**
   * Function to handle input change.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  /* Function to handle closing the modal */
  const handleClose = () => {
    setInput('');
    close();
  }

  return (
    <>
      <div>
        <h1 className="text-center text-lg font-semibold">New Group</h1>
      </div>
      <form className="space-x-4">
        <label htmlFor="group">Group Name:</label>
        <input
          type="text"
          id="group"
          name="group"
          value={input}
          onChange={handleInputChange}
        />
      </form>
      <div className="flex justify-around">
        <button onClick={() => handleClose()} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700">Cancel</button>
        <button type="submit" onClick={(event) => onSubmit(event, input)} className="text-white bg-green-500 py-1 px-4 rounded-2xl hover:bg-green-700">Create</button>
      </div>
    </>
  );
}
