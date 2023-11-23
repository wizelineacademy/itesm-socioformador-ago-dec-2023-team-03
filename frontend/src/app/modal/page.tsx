"use client";
import DeleteTeam from "@/src/components/modals/DeleteTeam";
import Modal from "@/src/components/modals/Modal";
import NewGroup from "@/src/components/modals/NewGroup";
import RemoveUser from "@/src/components/modals/RemoveMember";
import { useRef } from "react";

export default function ModalPage() {
  const dialog = useRef(null);
  const dialogNewGroup = useRef(null);
  const dialogRemoveUser = useRef(null);
  const dialogDeleteTeam = useRef(null);

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

  const openModalDeleteTeam = () => {
    dialogDeleteTeam.current.showModal();
  }

  const closeModalDeleteTeam = () => {
    dialogDeleteTeam.current.close();
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
      <button onClick={() => openModalDeleteTeam()}>Delete Group</button>
      <dialog ref={dialogDeleteTeam} className="py-3 px-14 rounded-2xl space-y-4">
        <DeleteTeam close={closeModalDeleteTeam} />
      </dialog>
    </>
  );
}
