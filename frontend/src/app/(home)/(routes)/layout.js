import Sidebar from '../_components/sidebar';

function HomeLayout({ children }) {
  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      <main className='w-full h-full bg-regal-blue-normal'>
        {children}
      </main>
    </div>
  );
}

export default HomeLayout;
