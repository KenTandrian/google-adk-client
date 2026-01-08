/**
 * Type Compatibility Test
 *
 * This file verifies that our local type definitions are structurally compatible
 * with the official `@google/adk` types.
 *
 * Run: npx tsc --noEmit src/types/__tests__/compatibility.test.ts --skipLibCheck
 *
 * If it compiles successfully, our types are compatible.
 * If it fails, we need to update our local types to match the official spec.
 */

import type { Event, EventActions, Session } from "@google/adk";
import { describe, expect, it } from "vitest";

import type {
  Session as AdkAgentSession,
  Event as AdkEvent,
  EventActions as AdkEventActions,
} from "../google-adk";

/**
 * Strict Type Compatibility Checks
 *
 * These assertions will cause compilation errors if our local types
 * are not assignable to the official `@google/adk` types.
 */

describe("Type compatibility", () => {
  // Test that our Event can be assigned to the official Event
  const testEvent: Event = {} as AdkEvent;

  // Test that our EventActions can be assigned to the official EventActions
  const testEventActions: EventActions = {} as AdkEventActions;

  // Test that our Session can be assigned to the official Session
  const testSession: Session = {} as AdkAgentSession;

  it("should compile if types are compatible", () => {
    expect(testEvent).toMatchObject({});
    expect(testEventActions).toMatchObject({});
    expect(testSession).toMatchObject({});
  });
});
