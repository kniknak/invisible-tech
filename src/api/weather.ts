import {Coords} from "../types"
import axios from "axios"
import axiosRetry from "axios-retry"

const client = axios
  .create({baseURL: "https://api.openweathermap.org/data/2.5"})

axiosRetry(client, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: () => true,
})

const appKey = "f6c76860b4fdb485a47925d9b001d147"

export const getWeatherByCoordinates = ({lat, lng}: Coords) => (
  client
    .get(`/weather?lat=${lat}&lon=${lng}&appid=${appKey}`)
)
