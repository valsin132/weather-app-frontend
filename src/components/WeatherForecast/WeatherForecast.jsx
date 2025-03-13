import Card from '../Card/Card'
import styles from './WeatherForecast.module.scss'

const getDayOfWeek = (timestamp) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(timestamp * 1000)
  return `${daysOfWeek[date.getDay()]} ${date.getDate()}`
}

// const formatTime = (timestamp) => {
//   const date = new Date(timestamp * 1000)
//   return `${date.getHours()}:00`
// }

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

  const getUniqueDayNames = () => {
    if (weatherDataHourly) {
      const dayNames = new Set()
      return weatherDataHourly.list.reduce((uniqueDayNames, data) => {
        const dayName = getDayOfWeek(data.dt)
        if (!dayNames.has(dayName)) {
          dayNames.add(dayName)
          uniqueDayNames.push(dayName)
        }
        return uniqueDayNames
      }, [])
    }
    return []
  }

  // Render unique day names once a week
  const uniqueDayNames = getUniqueDayNames()

  return (
    <Card title={'Weather Forecast'}>
      {/* <div className={styles.forecastScroll}>
        <ul className={styles.forecastList}>
          {filteredData.map((data, index) => {
            const dayWithDate = getDayOfWeek(data.dt)
            const isNewDay = index === 0 || getDayOfWeek(filteredData[index - 1].dt) !== dayWithDate

            return (
              <div>
                {isNewDay && <h3 className={styles.dayWithDate}>{dayWithDate}</h3>}
                <li key={data.dt}>
                  <p>{formatTime(data.dt)}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                  <p>{data.main.temp}°C</p>
                </li>
              </div>
            )
          })}
        </ul>
      </div> */}
      <div className={styles.forecastScroll}>
        {uniqueDayNames.map((dayName) => (
          <div key={dayName}>
            <span className={styles.dayWithDate}>{dayName}</span>
            <ul className={styles.forecastList}>
              {weatherDataHourly &&
                weatherDataHourly.list.map((data) => {
                  if (getDayOfWeek(data.dt) === dayName) {
                    return (
                      <li key={data.dt}>
                        <p>{data.dt_txt.split(' ')[1]}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                          alt="Weather Icon"
                        ></img>
                        <p>
                          {data.main.temp} <span>°C</span>
                        </p>
                      </li>
                    )
                  }
                  return null
                })}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default WeatherForecast
