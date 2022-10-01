import styles from '../styles/Navbar.module.css'
import { ChevronDownIcon } from '@heroicons/react/outline'

const Navbar = () => {
  return <nav className={ styles.navigationContainer}>
    <div className={ styles.container }>
      <div className={ styles.logoContainer }>
        <img src="../assets/venmo-logo.svg" alt="Venmo logo" className={ styles.logoImage } />
      </div>

      <div className= { styles.actionsContainer}>
        <p>
          Hello <span className={ styles.accentColor}>User Address</span>! 👋
        </p>
        <ChevronDownIcon className={ styles.arrowDownIcon } />

        <div className={ styles.avatarContainer}>
          <img src="https://yeeqiang.me/avatar.jpeg" alt="Avatar" className={ styles.avatarImage } />
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar
