import { Avatar } from 'antd';

interface PromptProps {
  Prompt: string;
}

export default function Prompt({ Prompt }: PromptProps) {
  return (
    <div className="flex justify-end gap-2 items-center">
      <span style={{ backgroundColor: '#203449' }} className="grid w-fit text-gray-100 rounded-full px-4 py-2 font-medium">{Prompt}</span>
      <Avatar size={40} src="https://i.ibb.co/0jZzQYH/IMG-20211017-212544.jpg" />
    </div>
  )
}
