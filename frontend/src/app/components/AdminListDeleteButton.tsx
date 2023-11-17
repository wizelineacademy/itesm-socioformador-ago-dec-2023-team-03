import { CgClose } from "react-icons/cg";

import DeleteGroup from "@/src/components/modals/DeleteGroup";
import Modal from "@/src/components/modals/Modal";
import RemoveUser from "@/src/components/modals/RemoveUser";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function AdminListDeleteButton() {

  const dialog = useRef<null | HTMLDialogElement>(null);
  const modalGroup = useRef<null | HTMLDialogElement>(null);
  const modalUser = useRef<null | HTMLDialogElement>(null);
  const pathname = usePathname();

  const openModal = () => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }

  const closeModal = () => {
    if (dialog.current) {
      dialog.current.close();
    }
  }

  const openSubModal = () => {
    if (modalGroup.current) {
      modalGroup.current.showModal();
    }
  }

  const closeSubModal = () => {
    if (modalGroup.current) {
      modalGroup.current.close();
    }
  }

  const openUserModal = () => {
    if (modalUser.current) {
      modalUser.current.showModal();
    }
  }

  const closeUserModal = () => {
    if (modalUser.current) {
      modalUser.current.close();
    }
  }

  return (
    <>
      <button className='flex bg-red-600 hover:bg-red-500 rounded-md h-10 justify-self-center aspect-square justify-center items-center' onClick={() => openModal()}>
        <CgClose size={25} />
      </button>
      <dialog ref={dialog} className="py-3 px-14 rounded-2xl space-y-4">
        {pathname === "/admin/teams" ? <DeleteGroup openSubModal={openSubModal} close={closeModal} /> : <RemoveUser openUserModal={openUserModal} close={closeModal} />}
      </dialog>

      <dialog ref={modalGroup} className="py-3 px-14 rounded-2xl space-y-4">
        <Modal title="Message" message="The group has been deleted" close={closeSubModal} />
      </dialog>

      <dialog ref={modalUser} className="py-3 px-14 rounded-2xl space-y-4">
        <Modal title="Message" message="The user has been removed" close={closeUserModal} />
      </dialog>
    </>
  )
}
