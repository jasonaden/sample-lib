import { setInterval, clearInterval } from "../src/set-interval"

jest.useFakeTimers()

describe("Intervals", () => {
  let cb
  beforeEach(() => {
    cb = jest.fn()
  })
  it("should perform a callback", () => {
    setInterval(cb)

    expect(cb).not.toBeCalled()

    jest.runTimersToTime(10)

    expect(cb).toBeCalled()
  })

  it("should default to 10ms", () => {
    setInterval(cb, 5)

    jest.runTimersToTime(5)

    expect(cb).not.toBeCalled()

    jest.runTimersToTime(5)

    expect(cb).toBeCalled()
  })

  it("should continue until stopped", () => {
    const id = setInterval(cb)

    jest.runTimersToTime(30)

    expect(cb.mock.calls.length).toBe(3)

    clearInterval(id)

    jest.runTimersToTime(30)

    expect(cb.mock.calls.length).toBe(3)
  })

  it("should pass parameters to the callback", () => {
    setInterval(cb, 10, "param1", "param", 2)

    jest.runTimersToTime(10)

    expect(cb).toHaveBeenCalledWith("param1", "param", 2)
  })
})
