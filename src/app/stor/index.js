import { configureStore } from "@reduxjs/toolkit";
import  WheatherSlice  from "../../features/weather/WeatherSlice";

export const store = configureStore({
    reducer: {
        weather: WheatherSlice
    }
})