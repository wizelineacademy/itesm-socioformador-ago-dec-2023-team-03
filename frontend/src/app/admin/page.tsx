import { redirect } from 'next/navigation';


export default function Home() {

  redirect('/admin/members');

  return (
    <div />
  )
}