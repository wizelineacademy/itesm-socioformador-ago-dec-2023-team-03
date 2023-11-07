"use client";

import Box from "./Box";
import React, { useState } from "react";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

var selectedLlm: string;

// List of LLMs to be displyed in the dropdown menu
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="/">
          GPT-4
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="/gpt">
          GPT 3.5
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" href="/">
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
        <div className="flex flex-col w-full">
                <header className = "py-2 text-right w-full text-3xl">
                    <Space direction='vertical'>
                        <div className="pr-20">
                            {/* <Dropdown menu={{ items }} placement='bottomLeft'>
                                <Button ghost size="large">
                                    {selectedLlm ? selectedLlm  : 'Select LLM'}
                                </Button>
                            </Dropdown> */}
                        </div>
                    </Space>
                </header>

                {children}
        </div>
    );
};

export default Header;