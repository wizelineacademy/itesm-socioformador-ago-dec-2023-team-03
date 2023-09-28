import Box from "@/components/Box";
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="h-full">
        <Sidebar>
          <Header>
            <div className="h-full pb-2">
              <Box className="h-full">
                Main Content
              </Box>
            </div>
          </Header>
        </Sidebar>
    </div>
  )
}
