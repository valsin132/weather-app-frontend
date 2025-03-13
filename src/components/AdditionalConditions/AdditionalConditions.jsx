import styles from './AdditionalConditions.module.scss'

const AdditionalConditions = ({ weatherData }) => {
  return (
    <div className={styles.additionalConditions}>
      <h2>Additional conditions</h2>
      <hr />
      <div className={styles.conditionsGrid}>
        <div>
          <p>Feels Like</p>
          <p>{weatherData.main.feels_like}°C</p>
        </div>
        <div>
          <p>Humidity</p>
          <p>{weatherData.main.humidity}%</p>
        </div>
        <div>
          <p>Pressure</p>
          <p>{weatherData.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  )
}

export default AdditionalConditions
