import Link from 'next/link';

import { RSSchoolSvg } from '../svg-icons';
import styles from './footer.module.scss';
import FooterMenu from './footer-menu';

const Footer = () => {
  return (
    <footer className={styles.main} data-testid='footer'>
      <div className={styles.wrapp}>
        <div className={styles.content}>
          <Link
            href='https://rs.school/react/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.schoolLink}
          >
            <RSSchoolSvg className={styles.svgSchool} />
          </Link>
          <FooterMenu />
        </div>
        <div className={styles.about}>
          <p className={styles.title}>© 2023 GraphiQL | ApiFinder</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
