import test from "ava"
import IntervalManager, { FunctionInfo } from "../src/utils/interval.ts"
import { store } from "openrct2-flexui"

let nextID = 1

globalThis.context = {
  setInterval: (func: Function, interval: number) => {
    return nextID++
  },
  clearInterval: (id: number) => {}
}

test("register adds a function to the registered list and returns the ID", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func = () => {}
  const interval = 2000
  const pauseOnManual = false

  const id = intervalManager.register(func, interval, pauseOnManual)

  const expectedInfo: FunctionInfo = {
    ID: id,
    func: func,
    interval: interval,
    paused: false,
    pause_on_manual: pauseOnManual
  }

  t.deepEqual(intervalManager.registeredFunctions, [expectedInfo])
  t.is(id, intervalManager.registeredIDs[0])
})

test("pauseManual pauses intervals with pause_on_manual set to true", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func1 = () => {}
  const func2 = () => {}
  const func3 = () => {}

  intervalManager.register(func1, 1000, true)
  intervalManager.register(func2, 2000, false)
  intervalManager.register(func3, 3000, true)

  intervalManager.pauseManual()

  const expectedRegistered: FunctionInfo[] = [
    { ID: 2, func: func1, interval: 1000, paused: true, pause_on_manual: true },
    {
      ID: 3,
      func: func2,
      interval: 2000,
      paused: false,
      pause_on_manual: false
    },
    { ID: 4, func: func3, interval: 3000, paused: true, pause_on_manual: true }
  ]

  t.deepEqual(intervalManager.registeredFunctions, expectedRegistered)
  t.true(intervalManager.isPausedOnManual)
})

test("pauseAll pauses all registered intervals", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func1 = () => {}
  const func2 = () => {}
  const func3 = () => {}

  const expectedRegistered: FunctionInfo[] = [
    {
      ID: intervalManager.register(func1, 1000),
      func: func1,
      interval: 1000,
      paused: true,
      pause_on_manual: true
    },
    {
      ID: intervalManager.register(func2, 2000),
      func: func2,
      interval: 2000,
      paused: true,
      pause_on_manual: true
    },
    {
      ID: intervalManager.register(func3, 3000),
      func: func3,
      interval: 3000,
      paused: true,
      pause_on_manual: true
    }
  ]

  intervalManager.pauseAll()

  t.deepEqual(intervalManager.registeredFunctions, expectedRegistered)
  t.true(intervalManager.isPaused)
})

test("resumeAll resumes all paused intervals", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func1 = () => {}
  const func2 = () => {}
  const func3 = () => {}

  const expectedRegistered: FunctionInfo[] = [
    {
      ID: intervalManager.register(func1, 1000) + 3,
      func: func1,
      interval: 1000,
      paused: false,
      pause_on_manual: true
    },
    {
      ID: intervalManager.register(func2, 2000) + 3,
      func: func2,
      interval: 2000,
      paused: false,
      pause_on_manual: true
    },
    {
      ID: intervalManager.register(func3, 3000) + 3,
      func: func3,
      interval: 3000,
      paused: false,
      pause_on_manual: true
    }
  ]

  intervalManager.pauseAll()
  intervalManager.resumeAll()

  t.deepEqual(intervalManager.registeredFunctions, expectedRegistered)
  t.false(intervalManager.isPaused)
})

test("clear clears the interval with the specified ID", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func = () => {}
  const interval = 1000

  const id = intervalManager.register(func, interval)
  intervalManager.clear(id)

  t.deepEqual(intervalManager.registeredIDs, [])
})

test("clearAll clears all registered intervals", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func1 = () => {}
  const func2 = () => {}
  const func3 = () => {}

  intervalManager.register(func1, 1000)
  intervalManager.register(func2, 2000)
  intervalManager.register(func3, 3000)

  intervalManager.clearAll()

  t.deepEqual(intervalManager.registeredIDs, [])
})

test("syncCounter pauses and resumes intervals to sync the countdown progress", (t) => {
  const intervalManager = new IntervalManager({
    update_frequency: store<number>(1),
    countdown_progress: store<number>(0)
  })

  const func1 = () => {}
  const func2 = () => {}
  const func3 = () => {}

  const expectedRegistered: FunctionInfo[] = [
    {
      ID: intervalManager.register(func1, 1000) + 3,
      func: func1,
      interval: 1000,
      paused: false,
      pause_on_manual: true
    },
    {
      ID: intervalManager.register(func2, 2000) + 3,
      func: func2,
      interval: 2000,
      paused: false,
      pause_on_manual: true
    },
    {
      ID: intervalManager.register(func3, 3000) + 3,
      func: func3,
      interval: 3000,
      paused: false,
      pause_on_manual: true
    }
  ]

  intervalManager.syncCounter()

  t.deepEqual(intervalManager.registeredFunctions, expectedRegistered)
  t.false(intervalManager.isPaused)
})
