import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="website footer">
      <small>&copy; {currentYear} valdemaras.net, All rights reserved.</small>
    </footer>
  );
};

export default Footer;
