import React from 'react';
import css from './HeroSection.module.css';
import heroSectionImage from '../../assets/hero-section-image.png';

function HeroSection() {

  return (
    <div className={css.heroSectionWrapper}>
        <div className={css.heroSectionContainer}>
            <div className={css.heroSectionContentLeft}>
                <h2>Handymen Anywhere <span>in Europe!</span></h2>
                <p>Connecting you with trusted, skilled mobile handymen across Europe—ready to handle repairs, maintenance, and on-demand services wherever you are.</p>
            </div>
            {/* <div className={css.heroSectionContentRight}>
                <img src={heroSectionImage} alt="hero-section-image" />
            </div> */}
        </div>
    </div>
  )
}

export default HeroSection