import { Avatar } from 'antd'
import { UserOutlined, DollarTwoTone } from '@ant-design/icons';

const userName = 'User Name'

// TODO: implement menu
function displayMenu() {
    console.log('display menu')
}

const UserCard: React.FC = () => {
    return (
        <div className='flex flex-row items-center gap-x-2 py-2'>
            <div className='cursor-pointer'>
                <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} onClick={displayMenu}>
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

