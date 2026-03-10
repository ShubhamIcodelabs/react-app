import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        <BackToTop/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
