import React from 'react';
import TopBarComponent from '@components/top-bar.component';
import Footer from '@components/footer.component';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className=''>
      <TopBarComponent />
      <div className='h-[200vh]'>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
