import Link from "next/link";

export default function AdminNavButtons() {
    return (
        <div className="flex flex-col gap-3">
            <Link href="/admin/members">
                <button className="btn btn-secondary w-full text-lg" >
                    Members
                </button>
            </Link>

            <Link href="/admin/teams">
                <button className="btn btn-secondary w-full text-lg" >
                    Teams
                </button>
            </Link>
        </div>
    )
}