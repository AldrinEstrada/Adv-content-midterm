import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'

const Home = () => {
  const router  = useRouter();
  const [cityName, setCityName] = useState('');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };


  const handleSearch = () => {
    router.push(`/weatherResults?cityName=${cityName}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.appTitle}>
        <Image
          className={styles.animation}
          src={'/images/brutherlogo.png'}
          height={120}
          width={100}
          alt="bruther logo"
        />

        <h1>Bruhther</h1>
        <h3>Weather for the bros</h3>
        <p>Check the weather today bruh!</p>
      </div>
      <div className={styles.searchTab}>
        <input
          type="text"
          value={cityName}
          onChange={handleCityChange}
          placeholder="Enter a city name"
          className={styles.search}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Search</button>
      </div>

      <footer className={styles.footer}>
        <p>Copyright © 2024 Bruhther Weather. All rights reserved.</p>
      </footer>
    </div>

  );
};

export default Home;