import { Member } from "@/src/types";
import { useState } from "react";

interface AddMemberProps {
  close: () => void;
  onSubmit: (event: React.FormEvent, member: Member) => void;
}

/**
 * This component is a modal to add a member to a group.
 * @param {AddMemberProps} props - The props of the component.
 * @param {function} props.close - Function to close the modal.
 * @param {function} props.onSubmit - Function to handle the submit event.
 * @returns {JSX.Element} JSX Element for the modal.
 */

export default function AddMemberInGroup({ close, onSubmit }: AddMemberProps) {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [member, setMember] = useState<Member | null>(null);


  /**
   * Function to handle name change.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event.
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  /**
   * Function to handle last name change.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event.
   */
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  }

  /**
   * Function to handle email change.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  /* Function to handle closing the modal */
  const handleClose = () => {
    setName("");
    setLastName("");
    setEmail("");
    close();
  }

  /**
   * New member object.
   * @type {Member}
   */
  const newMember: Member = {
    firstName: name,
    lastName: lastName,
    email: email,
    roleId: "388694b9-b700-477f-911d-6eb406b52789",
  }
  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">Create member</h1>
      </header>


      <form className="flex flex-col space-y-2">
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="w-full px-3 py-2 bg-gray-400 rounded-xl" placeholder="Name" value={name} onChange={handleNameChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" className="w-full px-3 py-2 bg-gray-400 rounded-xl" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="w-full px-3 py-2 bg-gray-400 rounded-xl" placeholder="Email" value={email} onChange={handleEmailChange} />
        </fieldset>
      </form>

      <div className="flex justify-around">
        <button onClick={() => handleClose()} className="text-white bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700">Cancel</button>
        <button type="submit" onClick={(event) => onSubmit(event, newMember)} className="text-white bg-green-500 py-1 px-4 rounded-2xl hover:bg-green-700">Create</button>
      </div>
    </>
  )
}
