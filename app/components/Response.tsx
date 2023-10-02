import { Avatar } from 'antd';

interface OutputProps {
  Output: string;
}

export default function Response({ Output }: OutputProps) {
  return (
    <div className="flex justify-start gap-2 items-center">
      <Avatar size={40} src="https://i.ibb.co/0jZzQYH/IMG-20211017-212544.jpg" />
      <output style={{ backgroundColor: '#D3D3D4' }} className="w-fit text-gray-600 rounded-full px-4 py-2">{Output}</output>
    </div>
  )
}
