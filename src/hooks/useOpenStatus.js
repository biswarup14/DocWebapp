import { useEffect, useState } from 'react';

/**
 * Opening hours, as minutes-from-midnight, keyed by IST day-of-week.
 *
 * The practice sits in Purulia, so the schedule is a property of the clinic's
 * wall clock, not the visitor's. Every read below is taken in Asia/Kolkata
 * explicitly — deriving it from the visitor's local time would tell a visitor
 * in Dubai or New York that the clinic is open when it is shut here.
 *
 * Index is `Date#getDay()`-equivalent for IST: 0 = Sunday ... 6 = Saturday.
 */
const SCHEDULE = {
  0: [],
  1: [[600, 840], [1020, 1200]],
  2: [[600, 840], [1020, 1200]],
  3: [[600, 840], [1020, 1200]],
  4: [[600, 840], [1020, 1200]],
  5: [[600, 840], [1020, 1200]],
  6: [[600, 840], [1020, 1200]],
  7: [],
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Format minutes-from-midnight as a 12-hour clock string, e.g. 600 -> '10am'. */
function toClock(minutes) {
  const hours24 = Math.floor(minutes / 60) % 24;
  const hour12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hour12}${hours24 < 12 ? 'am' : 'pm'}`;
}

/** Read the current day-of-week and minutes-from-midnight in Asia/Kolkata. */
function readNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());

  const get = (type) => parts.find((part) => part.type === type)?.value;

  return {
    // `hour12: false` yields hour 24 for midnight in some ICU builds, so
    // normalise before deriving the day index.
    day: DAY_NAMES.indexOf(get('weekday')),
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  };
}

/**
 * Resolve the live "are we open right now, and when does that change" answer.
 */
function computeStatus() {
  const now = readNow();
  const todaysWindows = SCHEDULE[now.day];

  const openWindow = todaysWindows.find(([start, end]) => now.minutes >= start && now.minutes < end);
  if (openWindow) {
    return { isOpen: true, label: `Open now · closes ${toClock(openWindow[1])}` };
  }

  // Closed. Find the next window that starts, checking the rest of today first
  // so that "opens today at 5pm" beats "opens tomorrow at 10am" during a
  // mid-session break.
  for (let offset = 0; offset < 8; offset += 1) {
    const day = (now.day + offset) % 7;
    for (const [start] of SCHEDULE[day]) {
      if (offset === 0 && start <= now.minutes) continue;
      const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : DAY_NAMES[day];
      return { isOpen: false, label: `Closed now · opens ${when} ${toClock(start)}` };
    }
  }

  return { isOpen: false, label: 'Closed now' };
}

/**
 * Live open/closed status for the clinic.
 *
 * Returns `null` until mounted. The home page is prerendered to static HTML at
 * build time, so baking a "Open now" verdict into the markup would be stale by
 * the time any visitor reads it — and computing it during the first client
 * render would make that render disagree with the server HTML and trip a
 * hydration mismatch. Starting at `null` and resolving in an effect keeps the
 * first paint identical on both sides, and the static hours text in the markup
 * still tells no-JS visitors when the clinic is open.
 */
export default function useOpenStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
