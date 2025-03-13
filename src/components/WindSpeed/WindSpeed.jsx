import ReactSpeedometer from 'react-d3-speedometer'
import styles from './WindSpeed.module.scss'

const WindSpeed = ({ windSpeed }) => {
  return (
    <div className={styles.windSpeed}>
      <h2>Wind Speed</h2>
      <hr />
      <div className={styles.speedometer}>
        {windSpeed !== undefined && (
          <ReactSpeedometer
            minValue={0}
            maxValue={20}
            width={250}
            height={200}
            needleHeightRatio={0.8}
            ringWidth={30}
            value={windSpeed}
            currentValueText="#{value} m/s"
            currentValuePlaceholderStyle={'#{value}'}
            startColor={'#7900F2'}
            endColor={'#390768'}
            needleColor="#fff"
            textColor="#F8FAFC"
          />
        )}
      </div>
    </div>
  )
}

export default WindSpeed
