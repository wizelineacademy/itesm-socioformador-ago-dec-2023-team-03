import Sidebar from '../_components/sidebar';

/**
 * HomeLayout component for home route.
 * @function
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The children nodes.
 * @returns {JSX.Element} Rendered component.
 */
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
