import { useState } from 'react';
import styles from './Navbar.module.css';
import investlogogo from './../../assest/images/investlogogo.png';

function NavbarHeader() {
    const [isActive, setIsActive] = useState(false);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    const handleNavLinkClick = (id, event) => {
        event.preventDefault(); // Prevent default anchor link behavior
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            removeActive();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <nav className={`${styles.navbar}`}>
                    {/* <a href='#home' className={`${styles.logo}`}><img src={investlogogo} /></a> */}
                    <ul id="navlinks" className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                        <li onClick={(event) => handleNavLinkClick('home', event)}>
                            <a href='#home' className={`${styles.navLink}`}>Home</a>
                        </li>
                        <li onClick={(event) => handleNavLinkClick('services', event)}>
                            <a href='#services' className={`${styles.navLink}`}>Services</a>
                        </li>
                        <li onClick={(event) => handleNavLinkClick('about', event)}>
                            <a href='#about' className={`${styles.navLink}`}>About</a>
                        </li>
                        
                        <li onClick={(event) => handleNavLinkClick('contact', event)}>
                            <a href='#contact' className={`${styles.navLink}`}>Contact</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/login' className={`${styles.navLink}`}>Login</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/register' className={`${styles.navLink}`}>Register</a>
                        </li>
                    </ul>
                    <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
                        <span className={`${styles.bar}`}></span>
                        <span className={`${styles.bar}`}></span>
                        <span className={`${styles.bar}`}></span>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default NavbarHeader;
