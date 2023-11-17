"use client";
import { useState } from "react";

interface NewGroupProps {
  close: () => void;
}

export default function NewGroup({ close }: NewGroupProps) {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input }),
      });
      const data = await res.json();
      console.log(data);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  const handleClose = () => {
    setInput('');
    close();
  }

  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">New Group</h1>
      </header>
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
      <footer className="flex justify-around">
        <button onClick={() => handleClose()} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700">Cancel</button>
        <button type="submit" onClick={(e) => handleSubmit(e)} className="text-white bg-green-500 py-1 px-4 rounded-2xl hover:bg-green-700">Create</button>
      </footer>
    </>
  );
}
