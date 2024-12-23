import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Autocomplete, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData,resetData } from "../../features/weather/WeatherSlice";
import PositionSvg from "../Svgs/PositionSvg";


export const SearchBar = () => {

    const [cities, setCities] = useState([])
    const [unity, setUnity] = useState('metric')
    const dispatch = useDispatch()
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    const [geoLocation,setGeoLocation] = useState(undefined)
    const [isCurrentLocation, setIsCurrentLocation] = useState(false)

    const handleInputChange = (e) => {

      const {value} = e.currentTarget

      if(value === '' && navigator.geolocation){
        setIsCurrentLocation(false)
      }

        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
        .then((response) => response.json()).then((json) => {

            setCities(json.results?.map(data => {
            const {city,country, lat, lon, formatted} = data
            return {city,country, lat, lon, formatted}

            }))

            
        })

      
        
    }
    const getData = () => {
       if(geoLocation){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&units=${unity}&appid=${WEATHER_API_KEY}`)
           .then(response => response.json())
           .then(json => {
           const {clouds, main, dt, name, sys, weather, wind} = json
           dispatch(setData({clouds, dt, main, name, sys, weather, wind}))
           })
       }
    }
    const handleAutoCompleteSelect = (_,value) => {
        if(value !== null){
            const {lon, lat} = value
            setIsCurrentLocation(false)
            setGeoLocation({
                lon,lat,
            })
           
        }else{
            dispatch(resetData())
        }
    
    }
    
    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((positio)=>{
            setIsCurrentLocation(true)
          setGeoLocation({
            lon: positio.coords.longitude,
            lat: positio.coords.latitude
          })
        })
    }

    useEffect(()=>{
        getGeoLocation()
    },[])

    useEffect(()=>{
        getData()
    },[geoLocation])


    return (
        <>
            <div
                className={styles.searchContainer}>
                <Autocomplete className={styles.searchInput}
                              clearOnBlur={false}
                              onChange={handleAutoCompleteSelect}
                              getOptionLabel={(option) => option.formatted}
                              renderInput={(params) =>
                                  <TextField onChange={handleInputChange} {...params}
                                             label={'Enter your city ...'}/>}
                              options={cities || []}/>

                <Button disabled={geoLocation === undefined || isCurrentLocation} variant="primary"
                        onClick={() => getGeoLocation()}><PositionSvg color={'#fff'}/></Button>
            </div>
        </>
    )
}