import React from 'react';
import styles from './Update.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Update = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h1 className={styles.message}>Will be Updated Soon...</h1>
    </div>
    <Footer/>
    </>
  );
};

export default Update;
