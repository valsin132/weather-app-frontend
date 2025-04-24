import ReactSpeedometer from 'react-d3-speedometer';
import Card from '../Card/Card';
import styles from './WindSpeed.module.scss';

const WindSpeed = ({ windSpeed }) => {
  return (
    <Card title={'Wind Speed'}>
      <div className={styles.speedometer} tabIndex="0" aria-label="wind speed">
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
    </Card>
  );
};

export default WindSpeed;
