import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='bg-timberwolf font-monospace min-h-screen flex flex-col'>
      <div className='flex-grow'>
        <Outlet />
      </div>
      <div className='sticky bottom-0 left-0 right-0'>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
