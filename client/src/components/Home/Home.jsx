import React from 'react'
import Header from './Header/Header';
import Contents from './Contents/Contents';
import Footer from './Footer/Footer';
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Contents />
      <Footer />
    </div>
  );
}

export default Home;