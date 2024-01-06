import HomeAbout from '@/components/home/home-about/home-about';
import HomeCourse from '@/components/home/home-course/home-course';
import HomeMain from '@/components/home/home-main/home-main';
import HomeTeam from '@/components/home/home-team/home-team';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.main}>
      <HomeMain />
      <HomeAbout />
      <HomeCourse />
      <HomeTeam />
    </div>
  );
};

export default Home;
