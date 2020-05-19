import {fetchAddressInfo} from "./fetchAddressInfo"

export const run = async (adresses: (string | number)[]) => {
  const promises = adresses
    .map(address =>
      fetchAddressInfo(address)
        .then(({result, error, address}) => {
          if (result) {
            console.log(
              "Address: ", (address + "").padEnd(10),
              "Lat: ", result.coords.lat,
              "Lng: ", result.coords.lng,
              "Date:", result.date,
              "Temperature: ", result.temperature,
              "Weather: ", result.weather.join(", "),
            )
          }

          if (error) {
            console.error("Address: ", address, "Unexpected error")
          }
        }),
    )

  await Promise.all(promises)
}
