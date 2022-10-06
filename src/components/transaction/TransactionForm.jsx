import {CurrencyDollarIcon, SwitchHorizontalIcon} from '@heroicons/react/outline';
import {useContext} from 'react';
import {TransactionContext} from '../../context/context';
import styles from '../../styles/Transaction.module.css'

const TransactionForm = () => {
  const { sendTransaction, message, setMessage, addressTo, setAddressTo, amount, setAmount } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the page from refreshing on click on submit
    if (!message || !amount || !addressTo) return;
    sendTransaction();
  }
  
  return (
    <div className={ styles.container }>
      <h3 className={ styles.formTitle }>Send Payment / Request</h3>
      <form onSubmit={ handleSubmit }>
        <div className={ styles.formContainer }>
          <div className={ styles.swapContainer }>
            <SwitchHorizontalIcon className={ styles.swapIcon } />
            <p className={ styles.swapTitle }>Swap to/from</p>        
          </div>

          <div className={ styles.formBody }>
            <div className={ styles.formInputContainer }>
              <h5 className={ styles.formInputTitle }>To</h5>
              <input className={ styles.formInput } type='text'
                autoComplete='off' 
                value={ addressTo } 
                onChange={ e => setAddressTo(e.target.value) }
              />
            </div>
            <div className={ styles.formInputContainer }>
              <h5 className={ styles.formInputTitle }>Message</h5>
              <input className={ styles.formInput } type='text' 
                autoComplete='off'
                value={ message }
                onChange={ e => setMessage(e.target.value) }
              />
            </div>
          </div>

          <div className={ styles.formFooter }>
            <h5 className={ styles.footerTitle }>Amount</h5>
            <div className={ styles.footerContainer }>
              <div className={ styles.amountContainer }>
                <div className={ styles.inputContainer }>
                  <CurrencyDollarIcon className={ styles.dollarIcon } />
                  <input className={ styles.formInput } type='number' 
                    autoComplete='off'
                    step='0.001'
                    value={ amount }
                    onChange={ e => setAmount(e.target.value) }
                  />
                </div>
              </div>
              <button className={ styles.sendButton } type='submit'>Send</button>
            </div>
          </div> 
        </div>
      </form>
    </div>
  )
}

export default TransactionForm;