import test from "ava"
import HookManager from "../src/utils/hooks.js"
import Mock from "openrct2-mocks"

test("hook returns an ID", (t) => {
  const id = HookManager.hook("action.query", () => {})
  t.is(typeof id, "number")
})

test("hook increments the ID", (t) => {
  const id1 = HookManager.hook("action.query", () => {})
  const id2 = HookManager.hook("action.query", () => {})
  t.is(id2, id1 + 1)
})

test("activate subscribes to hooks", (t) => {
  globalThis.context = Mock.context()
  HookManager.hook("action.query", () => {})
  HookManager.activate()
  t.is(globalThis.context.subscriptions.length, 1)
  t.is(globalThis.context.subscriptions[0].hook, "action.query")
  t.false(globalThis.context.subscriptions[0].isDisposed)
})
