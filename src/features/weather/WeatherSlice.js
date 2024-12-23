import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clouds: undefined,
    dt:undefined,
    main: {
        feels_like: undefined
    }, 
    name: undefined, 
    sys: {
        country: undefined
    }, 
    weather: undefined, 
    wind: undefined,
    isLoaded: undefined

}
export const WheatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setData: (state,action) => {
            const {clouds, dt ,main, name, sys, weather, wind} = action.payload
          state.clouds = clouds
          state.dt = dt
          state.main = main
          state.name = name
          state.sys = sys
          state.weather = weather[0]
          state.wind = wind
          state.isLoaded = true
        },
        resetData: (state) => {
          state.isLoaded = false
        }
    }
})


export const {setData,resetData} = WheatherSlice.actions

export default WheatherSlice.reducer
