import {getCoordinatesByAddress} from "./api/geolocation"
import {getWeatherByCoordinates} from "./api/weather"
import {Coords} from "./types"

interface FetchAddressResult {
  address: string | number
  result?: {
    date: Date
    temperature: number
    weather: string[]
    coords: Coords
  }
  error?: any
}

export const fetchAddressInfo = async (address: string | number): Promise<FetchAddressResult> => {
  try {
    const geolocation = await getCoordinatesByAddress(address)

    const coords: Coords = {
      lat: geolocation.data[0].lat,
      lng: geolocation.data[0].lon,
    }

    const {data} = await getWeatherByCoordinates(coords)

    const date = new Date()
    date
      .setSeconds(date.getSeconds() + data.timezone)

    return {
      address,
      result: {
        date,
        temperature: Math.round((data.main.temp - 273.15) * 100) / 100,
        weather: data.weather
          .map((type: any) => type.main),
        coords,
      },
    }
  } catch (error) {
    return {
      address,
      error,
    }
  }
}
