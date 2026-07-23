import { MAX_MESSAGE_LENGTH } from "./types.js";

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate a banner message: reject over-length and markup-containing input,
 * while allowing ordinary punctuation. Mirrors AIS-132. Implemented and covered
 * by tests as part of the green baseline.
 */
export function validateMessage(value: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (value.length > MAX_MESSAGE_LENGTH) {
    errors.push({
      field: "message",
      message: `must be at most ${MAX_MESSAGE_LENGTH} characters`,
    });
  }

  // Reject anything that looks like markup/tags; allow ordinary punctuation.
  if (/[<>]/.test(value)) {
    errors.push({
      field: "message",
      message: "must not contain markup characters (< or >)",
    });
  }

  return errors;
}
