"use client";

import { useRef } from "react";

interface NewGroupProps {
  openSubModal: () => void;
  close: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

/**
 * This component is a modal to delete a team.
 * @param {NewGroupProps} props - The props of the component.
 * @param {function} props.close - Function to close the modal.
 * @param {function} props.openSubModal - Function to open the sub modal.
 * @param {function} props.onSubmit - Function to handle the submit event.
 * @returns {JSX.Element} JSX Element for the modal.
 */

export default function DeleteTeam({ close, openSubModal, onSubmit }: NewGroupProps) {
  const modal = useRef<null | HTMLDialogElement>(null);

  /* Function to handle closing the modal */
  const handleClose = () => {
    close();
  }

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
        <button onClick={(event) => onSubmit(event)} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700">Delete</button>
      </footer>
    </>
  );
}
