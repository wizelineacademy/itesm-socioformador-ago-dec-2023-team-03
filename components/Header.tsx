"use client";

import Box from "./Box";
import React, { useState } from "react";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';


// List of LLMs to be displyed in the dropdown menu
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          GPT-4
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          GPT 3.5
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          BARD
        </a>
      ),
    },
  ];


interface HeaderProps {
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
    children,
}) => {
    // TODO: implement loading state for dropdown menu
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="h-full flex flex-col gap-y-1 w-full pr-2 pt-2">
                <Box className = "py-2 text-right w-full text-3xl">
                    <Space direction='vertical'>
                        <Space wrap>
                            <Dropdown menu={{ items }} placement='bottomLeft'>
                                <Button ghost size="large">
                                    Pick an LLM
                                </Button>
                            </Dropdown>
                        </Space>
                    </Space>
                </Box>
                <main className="h-full">
                    {children}
                </main>
        </div>
    );
};

export default Header;