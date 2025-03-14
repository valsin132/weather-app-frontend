import styles from './WeatherInfo.module.scss';

const WeatherInfo = ({ weatherData }) => {
  return (
    <div>
      <h2 className={styles.cityName}>
        {weatherData.name} - {weatherData.sys.country}
      </h2>
    </div>
  );
};

export default WeatherInfo;
