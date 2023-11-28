"use client";

interface ModalProps {
  title: string;
  message: string;
  close: () => void;
}

/**
 * This component is a general purpose modal.
 * @param {ModalProps} props - The props of the component.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.message - The message of the modal.
 * @param {function} props.close - Function to close the modal.
 * @returns {JSX.Element} JSX Element for the modal.
 */
export default function Modal({ title, message, close }: ModalProps) {
  /* Function to handle closing the modal */
  const handleClose = () => {
    close();
  }
  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">{title}</h1>
      </header>
      <div>
        <p>{message}</p>
      </div>
      <footer className="flex justify-center">
        <button onClick={() => handleClose()} className="text-white bg-gray-500 py-1 px-4 rounded-2xl hover:bg-gray-700 pointer-events-auto">Close</button>
      </footer>
    </>
  );
}
