import Card from '../Card/Card'
import styles from './WeatherForecast.module.scss'

const getDayOfWeek = (timestamp) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(timestamp * 1000)
  return `${daysOfWeek[date.getDay()]} ${date.getDate()}`
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return `${date.getHours()}:00`
}

const WeatherForecast = ({ weatherDataHourly }) => {
  const uniqueDays = new Set()
  const filteredData = []

  if (weatherDataHourly) {
    for (let data of weatherDataHourly.list) {
      const dayWithDate = getDayOfWeek(data.dt)
      if (!uniqueDays.has(dayWithDate) && uniqueDays.size < 5) {
        uniqueDays.add(dayWithDate)
      }
      if (uniqueDays.has(dayWithDate)) {
        filteredData.push(data)
      }
    }
  }

  return (
    <Card title={'Weather Forecast'}>
      <div className={styles.forecastScroll}>
        <ul className={styles.forecastList}>
          {filteredData.map((data, index) => {
            const dayWithDate = getDayOfWeek(data.dt)
            const isNewDay = index === 0 || getDayOfWeek(filteredData[index - 1].dt) !== dayWithDate

            return (
              <li key={data.dt}>
                {isNewDay && <h3 className={styles.dayWithDate}>{dayWithDate}</h3>}
                <p>{formatTime(data.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <p>{data.main.temp}°C</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Card>
  )
}

export default WeatherForecast
