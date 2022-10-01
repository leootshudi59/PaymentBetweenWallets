import styles from './styles/App.module.css';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className={ styles.wrapper }>
      <header>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
