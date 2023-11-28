// Import redirect function from Next.js navigation
import { redirect } from 'next/navigation';


/**
 * Home admin page component.
 * @function
 * @returns {JSX.Element} Rendered component.
 */
export default function Home() {

  // Redirect to '/admin/teams' by default if just type '/admin' in the URL
  redirect('/admin/teams');

  return (
    <div />
  )
}
