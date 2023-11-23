"use client";

import { useRef } from "react";

interface NewGroupProps {
  openSubModal: () => void;
  close: () => void;
}

export default function DeleteTeam({ close, openSubModal }: NewGroupProps) {
  const modal = useRef<null | HTMLDialogElement>(null);

  const handleClose = () => {
    close();
  }

  /* const handleDelete = async () => {
    try {
      const res = await fetch('/api/groups', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log(data);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  } */
  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">Warning</h1>
      </header>
      <div>
        <p>Are you sure you want to delete this team?</p>
      </div>
      <footer className="flex justify-around">
        <button onClick={() => handleClose()} className="text-white bg-gray-500 py-1 px-4 rounded-2xl hover:bg-gray-700">Go back</button>
        <button onClick={() => openSubModal()} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700">Delete</button>
      </footer>
    </>
  );
}
