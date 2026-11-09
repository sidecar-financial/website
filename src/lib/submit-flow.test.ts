import assert from "node:assert/strict";
import { test } from "node:test";
import { runLeadSubmit } from "./submit-flow";

const never = new Promise<void>(() => {});

function harness(submitResults: Array<"ok" | "fail">) {
  const calls = { submit: 0 };
  const timers: Array<() => void> = [];
  const submit = async () => {
    const result = submitResults[calls.submit++] ?? "ok";
    if (result === "fail") throw new Error("boom");
  };
  const setTimer = (fn: () => void) => {
    timers.push(fn);
  };
  return { calls, timers, submit, setTimer };
}

test("reports saved when the lead submit succeeds", async () => {
  const h = harness(["ok"]);
  const result = await runLeadSubmit({ pendingDraft: null, submit: h.submit, setTimer: h.setTimer });
  assert.deepEqual(result, { saved: true });
  assert.equal(h.calls.submit, 1);
  assert.equal(h.timers.length, 0);
});

test("reports not saved (and does not throw) when the lead submit fails", async () => {
  const h = harness(["fail"]);
  const result = await runLeadSubmit({ pendingDraft: null, submit: h.submit, setTimer: h.setTimer });
  assert.deepEqual(result, { saved: false });
});

test("retries once in the background after a failure", async () => {
  const h = harness(["fail", "ok"]);
  await runLeadSubmit({ pendingDraft: null, submit: h.submit, setTimer: h.setTimer });
  assert.equal(h.timers.length, 1);
  h.timers[0]();
  await new Promise((r) => setImmediate(r));
  assert.equal(h.calls.submit, 2);
  assert.equal(h.timers.length, 1, "no second retry is scheduled");
});

test("a failing background retry never throws", async () => {
  const h = harness(["fail", "fail"]);
  await runLeadSubmit({ pendingDraft: null, submit: h.submit, setTimer: h.setTimer });
  h.timers[0]();
  await new Promise((r) => setImmediate(r));
  assert.equal(h.calls.submit, 2);
});

test("does not wait forever for a slow draft save", async () => {
  const h = harness(["ok"]);
  const result = await runLeadSubmit({
    pendingDraft: never,
    draftWaitMs: 20,
    submit: h.submit,
    setTimer: h.setTimer,
  });
  assert.deepEqual(result, { saved: true });
  assert.equal(h.calls.submit, 1);
});

test("waits for a draft save that finishes quickly before submitting", async () => {
  const order: string[] = [];
  const draft = new Promise<void>((resolve) =>
    setTimeout(() => {
      order.push("draft");
      resolve();
    }, 5),
  );
  await runLeadSubmit({
    pendingDraft: draft,
    draftWaitMs: 500,
    submit: async () => {
      order.push("submit");
    },
    setTimer: () => {},
  });
  assert.deepEqual(order, ["draft", "submit"]);
});
