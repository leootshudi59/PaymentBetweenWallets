import {GlobeIcon, UserIcon, UserGroupIcon} from '@heroicons/react/outline';
import styles from '../../styles/Activity.module.css'

const ActivityCard = () => {
  return (
  <div className={ styles.container }>
    <div className={ styles.tabContainer}>
      <h3 className={ styles.tabTitle}>Activity</h3>
      <div className={ styles.navigationContainer }>
        <div className={ styles.navigationItem } data-current>
          <GlobeIcon className={ styles.navigationIcon } />
        </div>
        <div className={ styles.navigationItem }>
          <UserIcon className={ styles.navigationIcon } />
        </div>
        <div className={ styles.navigationItem }>
          <UserGroupIcon className={ styles.navigationIcon } />
        </div>
      </div>
    </div>
    <div className={ styles.feedList }>
      To implement here
    </div>
  </div>
  )
}

export default ActivityCard;