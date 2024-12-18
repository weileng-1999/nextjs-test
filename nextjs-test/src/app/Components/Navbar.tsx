'use client'; // This marks the component as a client component

import { useState } from "react";
import Link from "next/link";
import styles from "../styles//Navbar.module.css";  // Import the CSS module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>


        {/* Hamburger Menu */}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
        {/* Search Field */}
        <div className={`${styles.search} ${styles.remove}`} >
            <input type="text" placeholder="Search documentation..." />
          </div>
      </div>

      {/* Collapsible Menu for Mobile */}
      {isOpen && (
        <ul className={`${styles.menu} ${styles.mobile}`}>
          <li><Link href="#">Showcase</Link></li>
          <li><Link href="#">Docs</Link></li>
          <li><Link href="#">Blog</Link></li>
          <li><Link href="#">Analytics</Link></li>
          <li><Link href="#">Commerce</Link></li>
          <li><Link href="#">Templates</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
        
        
      )}

      {/* Desktop Menu */}
      <div className={`${styles.header} ${styles.desktop}`}>
          <ul className={`${styles.menu} ${styles.desktop}`}>
            <li><Link href="#">Showcase</Link></li>
            <li><Link href="#">Docs</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Analytics</Link></li>
            <li><Link href="#">Commerce</Link></li>
            <li><Link href="#">Templates</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
          <div className={styles.search}>
            <input type="text" placeholder="Search documentation..." />
          </div>
        </div>
    </nav>
  );
};

export default Navbar;