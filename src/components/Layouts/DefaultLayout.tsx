import React, { ReactNode } from 'react'
import Navbar from '../Navbar/Navbar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <Navbar />
        <div style={{marginTop:120}}>{children}</div>
  
  
      </>
    );
  };
  
  export default DefaultLayout;