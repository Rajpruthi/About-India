import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';
import styles from './layout.module.css';

export function Layout() {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

