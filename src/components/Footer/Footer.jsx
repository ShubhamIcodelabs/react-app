import css from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={css.wrap}>
      <div className={css.brand}>DenSyte</div>
      <div className={css.links}>
        <a href="#how">How it works</a>
        <a href="#creators">Creators</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>
      <div className={css.copy}>© {year} DenSyte. All rights reserved.</div>
    </footer>
  );
}
