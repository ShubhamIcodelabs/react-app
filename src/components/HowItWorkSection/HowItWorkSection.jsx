import css from './HowItWorkSection.module.css'
import IconCard from '../IconCard/IconCard'

function HowItWorkSection() {
  return (
    <div className={css.howItWorkSectionWrapper}>
        <div className={css.howItWorkSectionContainer}>
            <div className={css.howItWorkSectionContenDetail}>
                <div className={css.workBadge}>
                    <IconCard type="workbadge" />
                </div>
                <h5>How it works</h5>   
                <h1>Connecting you with trusted, <span>skilled handymen</span></h1>
            </div>
        </div>
    </div>
  )
}

export default HowItWorkSection