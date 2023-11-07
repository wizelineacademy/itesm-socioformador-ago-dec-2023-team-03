import { Button } from "antd"

export default function AdminNavButtons(){
    return(
        <div className="flex flex-col gap-3">
            <Button className="bg-regal-blue-light text-white" href="/admin/members">
                Members
            </Button>
            <Button className="bg-regal-blue-light text-white" href="/admin/teams">
                Teams
            </Button>
        </div>
    )
}