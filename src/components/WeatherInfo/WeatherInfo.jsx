import styles from "./WeatherInfo.module.scss"

const WeatherInfo = ({ weatherData }) => {
  return (
    <div className={styles.weatherInfo}>
      <h1 className={styles.header}>
        {weatherData.name} - {weatherData.sys.country}
      </h1>
    </div>
  )
}

export default WeatherInfo
