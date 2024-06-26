import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trash"
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
            >
              Trash
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;