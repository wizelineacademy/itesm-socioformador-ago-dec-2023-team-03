"use client";

interface RemoveMemberProps {
  openMemberModal: () => void;
  pathname: string;
  close: () => void;
}

export default function RemoveMember({ openMemberModal, pathname, close }: RemoveMemberProps) {

  const handleClose = () => {
    close();
  }
  /* const handleRemove = async () => {
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
        {
          pathname === "/admin/members/" ?
            <p>Are you sure you want to remove this member from this group?</p>
            :
            <p>Are you sure you want to delete this member?</p>
        }
      </div>
      <footer className="flex justify-around">
        <button onClick={() => handleClose()} className="text-white bg-gray-500 py-1 px-4 rounded-2xl hover:bg-gray-700 pointer-events-auto">Go back</button>
        <button onClick={() => openMemberModal()} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700 pointer-events-auto">Remove</button>
      </footer>
    </>
  );
}
