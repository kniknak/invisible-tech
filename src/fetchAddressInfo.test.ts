const getCoordinatesByAddressMock = jest.fn()
const getWeatherByCoordinatesMock = jest.fn()

jest.mock("./api/geolocation", () => ({
  getCoordinatesByAddress: getCoordinatesByAddressMock,
}))

jest.mock("./api/weather", () => ({
  getWeatherByCoordinates: getWeatherByCoordinatesMock,
}))

import {fetchAddressInfo} from "./fetchAddressInfo"
import {set} from "mockdate"

describe("fetchAddressInfo", () => {
  it("fetches data", async () => {
    set(10000000)
    getCoordinatesByAddressMock.mockReturnValue(Promise.resolve({
      data: [
        {
          lat: 1,
          lon: 2,
        },
      ],
    }))
    getWeatherByCoordinatesMock.mockReturnValue(Promise.resolve({
      data: {
        weather: [
          {
            main: "bar",
          },
        ],
        main: {
          temp: 300.15,
        },
        timezone: 3600,
      },
    }))

    const subject = await fetchAddressInfo("foo")
    expect(getCoordinatesByAddressMock).toHaveBeenLastCalledWith("foo")
    expect(getWeatherByCoordinatesMock).toHaveBeenLastCalledWith({lat: 1, lng: 2})
    expect(subject).toEqual({
      address: "foo",
      result: expect.objectContaining({
        temperature: 27,
        weather: ["bar"],
        coords: {
          lat: 1,
          lng: 2,
        },
      }),
    })
    expect(subject.result!.date.getTime()).toEqual(13600000)
  })

  it("handles error", async () => {
    getCoordinatesByAddressMock.mockReturnValue(Promise.reject("bar"))

    const subject = await fetchAddressInfo("foo")
    expect(subject).toEqual({
      address: "foo",
      error: "bar",
    })
  })
})
