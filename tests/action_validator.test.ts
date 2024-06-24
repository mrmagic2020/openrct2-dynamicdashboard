import test from "ava"
import ActionValidator from "../src/utils/action_validator.js"

test("check returns true for a new action", (t) => {
  const validator = new ActionValidator(1000)
  const action = {
    player: "Player 1",
    type: "Type 1",
    action: "Action 1",
    args: ["Arg 1", "Arg 2"]
  }
  const result = validator.check(action)
  t.true(result)
})

test("check returns false for a repeated action within the interval", (t) => {
  const validator = new ActionValidator(1000)
  const action1 = {
    player: "Player 1",
    type: "Type 1",
    action: "Action 1",
    args: ["Arg 1", "Arg 2"]
  }
  const action2 = {
    player: "Player 1",
    type: "Type 1",
    action: "Action 1",
    args: ["Arg 1", "Arg 2"]
  }
  validator.check(action1)
  const result = validator.check(action2)
  t.false(result)
})

test("check returns true for a repeated action after the interval", async (t) => {
  t.timeout(5000, "Ensure the test finishes before the timeout.")
  const validator = new ActionValidator(1000)
  const action1 = {
    player: "Player 1",
    type: "Type 1",
    action: "Action 1",
    args: ["Arg 1", "Arg 2"]
  }
  const action2 = {
    player: "Player 1",
    type: "Type 1",
    action: "Action 1",
    args: ["Arg 1", "Arg 2"]
  }
  t.true(validator.check(action1))
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      const result = validator.check(action2)
      t.true(result)
      resolve()
    }, 1000)
  )
})
