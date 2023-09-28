import Box from "@/components/Box";
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="h-full pb-2">
        <Sidebar>
          <Header>
            Main Content
          </Header>
        </Sidebar>
    </div>
  )
}
