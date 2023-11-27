"use client";

interface RemoveMemberProps {
  pathname: string;
  close: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function RemoveMember({
  pathname,
  close,
  onSubmit,
}: RemoveMemberProps) {

  const handleClose = () => {
    close();
  }

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
        <button onClick={onSubmit} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700 pointer-events-auto">Remove</button>
      </footer>
    </>
  );
}
