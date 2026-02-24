/**
 * Test domain constants - dùng cho timer, scoring, UI
 */
export const SUBMISSION_STATUS = {
  ONGOING: 'ongoing',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  FAILED: 'failed',
} as const;

export const USER_TEST_STATUS = {
  ALLOW: 'allow',
  CONTINUE: 'continue',
  CLOSED: 'closed',
  FORBIDDEN: 'forbidden',
} as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUS)[keyof typeof SUBMISSION_STATUS];
export type UserTestStatus = (typeof USER_TEST_STATUS)[keyof typeof USER_TEST_STATUS];
