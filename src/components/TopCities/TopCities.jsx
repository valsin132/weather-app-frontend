import Card from '../Card/Card'
import styles from './TopCities.module.scss'

const TopCities = ({ topCities }) => {
  return (
    <Card title={'Mostly Viewed Cities'} className={styles.container}>
      <ul className={styles.topList}>
        {topCities.map((city) => (
          <li key={city._id}>
            {city.selectedCity} - {city.views} views
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TopCities
