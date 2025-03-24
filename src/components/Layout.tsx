import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* header here */}
      <div>
        <Outlet />
      </div>
      {/* footer here */}
    </div>
  );
};

export default Layout;
