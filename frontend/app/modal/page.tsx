"use client";
import Modal from "@/app/components/Modal";
import { useRef } from "react";

export default function ModalPage() {
  const dialog = useRef(null);
  const openModal = () => {
    dialog.current.showModal();
  }
  const closeModal = () => {
    dialog.current.close();
  }
  return (
    <>
      <button onClick={() => openModal()}>Open Modal</button>
      <dialog ref={dialog}>
        <Modal title="Modal Title" message="Modal Message" close={closeModal} />
      </dialog>
    </>
  );
}
