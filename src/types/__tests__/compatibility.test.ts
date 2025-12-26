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

import type {
    AdkAgentEvent,
    AdkAgentSession,
    AdkEventActions,
} from "../index";

/**
 * Strict Type Compatibility Checks
 *
 * These assertions will cause compilation errors if our local types
 * are not assignable to the official `@google/adk` types.
 */

// Test that our Session can be assigned to the official Session
const testSession: Session = {} as AdkAgentSession;
console.log(testSession);

// Test that our Event can be assigned to the official Event
const testEvent: Event = {} as AdkAgentEvent;
console.log(testEvent);

// Test that our EventActions can be assigned to the official EventActions
const testEventActions: EventActions = {} as AdkEventActions;
console.log(testEventActions);

export const COMPATIBILITY_TEST = "If this file compiles, types are compatible";
