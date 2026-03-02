import { useEffect, useState } from 'react';
import IconCard from '../IconCard/IconCard';
import css from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
      <div className={`${css.headerWrapper} ${scrolled ? css.scrolled : ''}`}>
        <div className={css.headerContainer}>
          <div className={css.headerContentLeft}>
            <div className={css.logo}>
              <IconCard type="logo" />
            </div>
            <div className={css.menuLinks}>
              <a href='#'>Home</a>
              <a href='#'>About</a>
              <a href='#'>How it work</a>
              <a href='#'>Contact</a>
            </div>
          </div>
          <div className={css.headerContentRight}>
            <button className={css.browseHandymanButton}>Browse Handyman</button>  
            <div className={css.profileMenu}>
              <IconCard type="user" />
            </div>
          </div>
        </div>
      </div>
  );
}
