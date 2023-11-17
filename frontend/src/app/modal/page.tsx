"use client";
import DeleteGroup from "@/src/components/modals/DeleteGroup";
import Modal from "@/src/components/modals/Modal";
import NewGroup from "@/src/components/modals/NewGroup";
import RemoveUser from "@/src/components/modals/RemoveUser";
import { useRef } from "react";

export default function ModalPage() {
  const dialog = useRef(null);
  const dialogNewGroup = useRef(null);
  const dialogRemoveUser = useRef(null);
  const dialogDeleteGroup = useRef(null);

  const openModal = () => {
    dialog.current.showModal();
  }
  const closeModal = () => {
    dialog.current.close();
  }

  const openModalNewGroup = () => {
    dialogNewGroup.current.showModal();
  }

  const closeModalNewGroup = () => {
    dialogNewGroup.current.close();
  }

  const openModalRemoveUser = () => {
    dialogRemoveUser.current.showModal();
  }

  const closeModalRemoveUser = () => {
    dialogRemoveUser.current.close();
  }

  const openModalDeleteGroup = () => {
    dialogDeleteGroup.current.showModal();
  }

  const closeModalDeleteGroup = () => {
    dialogDeleteGroup.current.close();
  }

  return (
    <>
      <button onClick={() => openModal()}>Open Modal</button>
      <dialog ref={dialog} className="py-3 px-14 rounded-2xl space-y-4">
        <Modal title="Message" message="The group has been deleted" close={closeModal} />
      </dialog>
      <button onClick={() => openModalNewGroup()}>New Group</button>
      <dialog ref={dialogNewGroup} className="py-3 px-14 rounded-2xl space-y-4">
        <NewGroup close={closeModalNewGroup} />
      </dialog>
      <button onClick={() => openModalRemoveUser()}>Remove User</button>
      <dialog ref={dialogRemoveUser} className="py-3 px-14 rounded-2xl space-y-4">
        <RemoveUser close={closeModalRemoveUser} />
      </dialog>
      <button onClick={() => openModalDeleteGroup()}>Delete Group</button>
      <dialog ref={dialogDeleteGroup} className="py-3 px-14 rounded-2xl space-y-4">
        <DeleteGroup close={closeModalDeleteGroup} />
      </dialog>
    </>
  );
}
