import { redirect } from 'next/navigation';


export default function Home() {

  redirect('/admin/teams');

  return (
    <div />
  )
}