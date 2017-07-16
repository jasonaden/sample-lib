/*
Prompt: Implement mySetInterval() and myClearInterval() as functions that behave exactly like setInterval() 
and clearInterval(). Obviously, you’re not allowed to use setInterval() in your implementation, but 
everything else is fair game.
*/

let intervals = new Map<number, number | null>()

function runInterval(
  intervalId: number,
  func: () => void,
  delay: number,
  ...params: any[]
): number {
  if (intervals.has(intervalId)) {
    let timeoutId = window.setTimeout(
      function(...params) {
        func(...params)
        runInterval(intervalId, func, delay, ...params)
      },
      delay,
      ...params
    )

    intervals.set(intervalId, timeoutId)
  }
}

export function setInterval(
  func: string | (() => void),
  delay: number = 10,
  ...params: any[]
): number {
  const intervalId = Math.floor(Math.random() * 1000000000)

  // Executable function if string is passed in as first param
  if (typeof func === "string") {
    func = () => eval(func as string)
  }
  // Delay is always set to minimum of 10ms
  if (delay < 10) {
    delay = 10
  }

  // Null intervalId as we don't run the callback until end of first delay period.
  intervals.set(intervalId, null)
  // Kick off running the interval
  runInterval(intervalId, func, delay, ...params)

  return intervalId
}

export function clearInterval(intervalId: number): void {
  intervals.delete(intervalId)
}
