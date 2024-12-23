import styles from './Weather.module.scss'
import {Card} from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

export const Weather = () => {
    const weather = useSelector(({weather}) => weather)
    
    const displayIcon = () => {
        const urlIcon = `https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`
        return <img width={'100%'} src={urlIcon} alt=''/>
        
    }
    
    return (
        <>
            <Card className={styles.container}>
                {weather.isLoaded ? <Card.Body>
                    <Card.Title>
                        {weather.name} , {weather.sys.country} <PositionSvg color={'rgba(255,255,255,0.7)'}/>
                        <div className={styles.date}>
                            <div>
                                <Moment format='llll'/>
                            </div>
                            <div><Time width={'15px'} height={'15px'}/></div>
                        </div>
                    </Card.Title>
                    <Card.Text as={'div'} className={styles.weather_infos}>
                        <div>
                            {displayIcon()}
                        </div>
                        <div className={styles.temperature}>
                            <div>{weather.main.feels_like}° C</div>
                            <div>
                                <Thermometer/>
                            </div>
                        </div>
                        <div>
                            Good Morning {weather.name}
                            <div className={styles.separator}></div>
                        </div>
                        <div className={styles.infos}>
                            <div className={styles.border_right}>
                                <div><DefaultWeather color={'#fff'}/></div>
                                <div>Sunrise</div>
                                <div>
                                    <Moment unix={true} format={'hh:mm'}>
                                        {weather.sys.sunrise}
                                    </Moment>
                                </div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Wind/></div>
                                <div>Wind</div>
                                <div>{weather.wind?.speed} m/s</div>
                            </div>
                            <div>
                                <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
                                <div>Temp</div>
                                <div>{weather.main.temp_max} C</div>
                            </div>
                        </div>

                    </Card.Text>
                </Card.Body> : 
                <Card.Body>
                    <Card.Title>Choose your city ...</Card.Title>
                    </Card.Body>}
            </Card>
        </>
    )
}