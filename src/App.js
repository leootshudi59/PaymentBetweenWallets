import styles from './styles/App.module.css';
import NavBar from './components/Navbar';
import TransactionForm from './components/transaction/TransactionForm';
import ActivityCard from './components/activity/ActivityCard';

function App() {
  return (
    <div className={ styles.wrapper }>
      <header>
        <NavBar />
      </header>
      <main className={ styles.mainContainer }>
        <div className={ styles.activityContainer }>
          <ActivityCard />
        </div>
        <div>
          <TransactionForm />
        </div>
      </main>
    </div>
  );
}

export default App;
