import Link from "next/link";

/**
 * AdminNavButtons component (Members and Teams).
 * @component
 * @returns {JSX.Element} The rendered AdminNavButtons component.
 */
export default function AdminNavButtons() {
    return (
        <div className="flex flex-col gap-3">
            <Link href="/admin/members">
                <button className="btn btn-secondary w-full text-lg" >
                    {/* SVG icon get from internet */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Members
                </button>
            </Link>

            <Link href="/admin/teams">
                <button className="btn btn-secondary w-full text-lg" >
                    {/* SVG icon get from internet */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Teams
                </button>
            </Link>
        </div>
    )
}
