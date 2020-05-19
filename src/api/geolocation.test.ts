const getMock = jest.fn()
const createClientMock = jest.fn(() => ({
  get: getMock,
}))
jest.mock("axios", () => ({
  create: createClientMock,
}))

jest.mock("axios-retry")

import {getCoordinatesByAddress} from "./geolocation"

describe("api", () => {
  describe("getCoordinatesByAddress", () => {
    it("fetches data", () => {
      getCoordinatesByAddress("foo")

      expect(createClientMock)
        .toHaveBeenLastCalledWith({baseURL: "https://us1.locationiq.com/v1"})
      expect(getMock)
        .toHaveBeenLastCalledWith(expect
          .stringMatching(/^\/search\.php\?key=[^&]+&q=foo&format=json$/))
    })
  })
})
