import Card from '../Card/Card';
import styles from './TopCities.module.scss';

const TopCities = ({ topCities, loading }) => {
  return (
    <Card title={'Mostly Viewed Cities'} className={styles.container}>
      <ul className={styles.topList} tabIndex="0" aria-label="mostly viewed cities">
        {loading ? (
          <li>Loading...</li>
        ) : (
          topCities.map((city) => (
            <li key={city._id}>
              {city.selectedCity} - {city.views} views
            </li> 
          ))
        )}
      </ul>
    </Card>
  );
};

export default TopCities;
