import { ReactElement } from 'react';
import Header from './Header/Header';
import './Layout.scss';

const Layout = (props: any): ReactElement => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
