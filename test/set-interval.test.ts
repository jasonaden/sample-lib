import { setInterval, clearInterval } from "../src/set-interval"

describe("Intervals", () => {
  it("Performs a callback", () => {
    let log = []
    const cb = () => log.push("interval ran")
    setInterval(cb)
  })
})
