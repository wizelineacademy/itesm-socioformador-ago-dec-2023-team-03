import { Avatar } from 'antd'
import { UserOutlined, DollarTwoTone } from '@ant-design/icons';

const userName = 'User Name'

const UserCard: React.FC = () => {
    return (
        <div className='flex flex-row h-auto items-center w-full gap-x-4 py-3'>
            <div className='cursor-pointer'>
                <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}>
                    UN
                </Avatar>
            </div>
            <div>
                <p className="truncate w-fill text-md">Username</p>
                <div className='flex flex-row gap-x-1'>
                    <DollarTwoTone twoToneColor="#fcc203" />
                    <p className="truncate w-fill text-md">Tokens</p>
                </div>
            </div>
        </div>
    );
}

export default UserCard;

