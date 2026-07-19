import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';

export default function Layout() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
