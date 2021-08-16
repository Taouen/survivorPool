import Header from './Header.js';
import Footer from './Footer.js';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
