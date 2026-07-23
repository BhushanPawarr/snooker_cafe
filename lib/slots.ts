export const OPEN_HOUR = 11;
export const CLOSE_HOUR = 23;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function getDaySlots(): { start: string; end: string }[] {
  const slots = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    slots.push({ start: `${pad(hour)}:00`, end: `${pad(hour + 1)}:00` });
  }
  return slots;
}

export function slotsOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string
) {
  return aStart < bEnd && bStart < aEnd;
}

export function isValidSlot(start: string, end: string) {
  const timeRe = /^([01]\d|2[0-3]):00$/;
  if (!timeRe.test(start) || !timeRe.test(end)) return false;
  const startHour = Number(start.slice(0, 2));
  const endHour = Number(end.slice(0, 2));
  return (
    endHour === startHour + 1 &&
    startHour >= OPEN_HOUR &&
    endHour <= CLOSE_HOUR
  );
}

export function isValidDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}
