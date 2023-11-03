"use client";

export default function Modal({ title, message, close }) {
  const handleClose = () => {
    close();
  }
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <div>
        <p>{message}</p>
      </div>
      <footer>
        <button onClick={() => handleClose()}>Close</button>
      </footer>
    </>
  );
}
