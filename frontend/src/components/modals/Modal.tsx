"use client";

interface ModalProps {
  title: string;
  message: string;
  close: () => void;
}

export default function Modal({ title, message, close }: ModalProps) {
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
        <button onClick={() => handleClose()} className="text-white bg-gray-500 py-1 px-4 rounded-2xl hover:bg-gray-700">Close</button>
      </footer>
    </>
  );
}
