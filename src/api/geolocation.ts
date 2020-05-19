import axios from "axios"
import axiosRetry from "axios-retry"

const client = axios
  .create({baseURL: "https://us1.locationiq.com/v1"})

axiosRetry(client, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: () => true,
})

const appKey = "93e0cd85a3cb33"

export const getCoordinatesByAddress = (address: string | number) => (
  client
    .get(`/search.php?key=${appKey}&q=${address}&format=json`)
)
