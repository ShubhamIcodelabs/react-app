import React from 'react'
import styles from './AboutUsSection.module.css'

const AboutUsSection = () => {
    return (
        <section className={styles.aboutUs}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        About <span>Us</span>
                    </h2>
                    <div className={styles.divider}></div>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h3 className={styles.subtitle}>
                            We're Building Tomorrow's Solutions Today
                        </h3>
                        <p className={styles.description}>
                            With years of experience and a passion for innovation, we've established ourselves as leaders in delivering exceptional digital solutions that transform businesses and delight customers.
                        </p>
                        <p className={styles.description}>
                            Our team of dedicated professionals combines creativity with technical expertise to create solutions that not only meet your needs but exceed your expectations.
                        </p>
                        
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>500+</div>
                                <div className={styles.statLabel}>Happy Clients</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>1000+</div>
                                <div className={styles.statLabel}>Projects Done</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>10+</div>
                                <div className={styles.statLabel}>Years Experience</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.featureCard}>
                        <div className={styles.featureList}>
                            <div className={styles.featureItem}>
                                <div className={`${styles.icon} ${styles.blueIcon}`}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className={styles.featureTitle}>Innovation First</h4>
                                    <p className={styles.featureDescription}>We push boundaries and explore new possibilities to deliver cutting-edge solutions.</p>
                                </div>
                            </div>
                            
                            <div className={styles.featureItem}>
                                <div className={`${styles.icon} ${styles.greenIcon}`}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className={styles.featureTitle}>Customer Centric</h4>
                                    <p className={styles.featureDescription}>Your success is our success. We're committed to understanding and meeting your unique needs.</p>
                                </div>
                            </div>
                            
                            <div className={styles.featureItem}>
                                <div className={`${styles.icon} ${styles.purpleIcon}`}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className={styles.featureTitle}>Quality Assured</h4>
                                    <p className={styles.featureDescription}>Every solution we deliver meets the highest standards of excellence and reliability.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection

