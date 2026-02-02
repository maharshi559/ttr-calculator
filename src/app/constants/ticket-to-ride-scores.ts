export const TICKET_TO_RIDE_LENGTH_POINTS: Readonly<Record<number, number>> = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 10,
  6: 15,
  7: 18,
  8: 21,
  9: 27,
  10: 34,
};

export const DEFAULT_LENGTH = 1;

export type RouteLength = keyof typeof TICKET_TO_RIDE_LENGTH_POINTS;

export const getPointsForLength = (length: number) =>
  TICKET_TO_RIDE_LENGTH_POINTS[length] ?? null;
