import React, { ReactNode } from 'react'
import './reset.scss'
import './grid.scss'
import './base.scss'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-toastify/dist/ReactToastify.css';
import './pagination.scss'
import './notfound.scss'
import 'react-loading-skeleton/dist/skeleton.css'
const GlobalStyles = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
  };
  
  export default GlobalStyles;