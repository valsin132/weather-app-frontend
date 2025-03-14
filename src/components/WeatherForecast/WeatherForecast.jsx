import Card from '../Card/Card';
import styles from './WeatherForecast.module.scss';

const getDayOfWeek = (timestamp) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(timestamp * 1000);
  return `${daysOfWeek[date.getDay()]} ${date.getDate()}`;
};

const WeatherForecast = ({ weatherDataHourly }) => {
  // function to get unique day names (show only 5 days)
  const getUniqueDayNames = () => {
    if (!weatherDataHourly) return [];

    const dayNames = new Set();
    const uniqueDayNames = [];

    for (let data of weatherDataHourly.list) {
      const dayName = getDayOfWeek(data.dt);
      if (!dayNames.has(dayName)) {
        dayNames.add(dayName);
        uniqueDayNames.push(dayName);

        if (dayNames.size === 5) break;
      }
    }

    return uniqueDayNames;
  };

  const uniqueDayNames = getUniqueDayNames();

  return (
    <Card title={'Weather Forecast'}>
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
                        />
                        <p>
                          {data.main.temp} <span>°C</span>
                        </p>
                      </li>
                    );
                  }
                  return null;
                })}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeatherForecast;
