const getMock = jest.fn()
const createClientMock = jest.fn(() => ({
  get: getMock,
}))
jest.mock("axios", () => ({
  create: createClientMock,
}))

jest.mock("axios-retry")

import {getWeatherByCoordinates} from "./weather"

describe("api", () => {
  describe("getWeatherByCoordinates", () => {
    it("fetches data", () => {
      getWeatherByCoordinates(({lat: 1, lng: 2}))

      expect(createClientMock)
        .toHaveBeenLastCalledWith({baseURL: "https://api.openweathermap.org/data/2.5"})
      expect(getMock)
        .toHaveBeenLastCalledWith(expect
          .stringMatching(/^\/weather\?lat=1&lon=2&appid=[a-z0-9]+$/))
    })
  })
})
