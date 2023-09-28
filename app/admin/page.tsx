"use client";

import Box from "@/components/Box";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";


export default function Home() {
    const pathname = usePathname();

    return (
      <div className="h-full">
        <Sidebar reference={pathname}>
            <Header>
                <div className="h-full pb-2">
                    <Box className="h-full">
                        Admin Dashboard
                    </Box>
                </div>
            </Header>
        </Sidebar>
      </div>
    )
  }