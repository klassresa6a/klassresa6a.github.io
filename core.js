/* Pure logic, shared by the page and Node's built-in tests. No dependencies. */
(function (root) {
  'use strict';
  const TZ = 'Europe/Stockholm';
  const isNumber = value => typeof value === 'number' && Number.isFinite(value);
  const money = value => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(value) + ' kr';
  function progress(balance, goal) {
    if (!isNumber(balance)) return { error: true };
    if (!isNumber(goal) || goal <= 0) return { balance, validGoal: false };
    const raw = balance / goal * 100;
    return { balance, goal, validGoal: true, raw, visual: Math.max(0, Math.min(100, raw)), displayed: Math.round(raw), remaining: Math.max(goal - balance, 0) };
  }
  const validDate = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
  const validTime = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(date) && Number.isFinite(Date.parse(date));
  function stockholmDate(now) { return new Intl.DateTimeFormat('sv-SE', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now); }
  function validSchedule(s) {
    if (!s) return false;
    if (s.kind === 'tentative') return typeof s.label === 'string' && !!s.label.trim();
    if (s.kind === 'timed') return validTime(s.start) && validTime(s.end) && Date.parse(s.end) > Date.parse(s.start);
    return s.kind === 'allDay' && validDate(s.startDate) && validDate(s.endDateExclusive) && s.endDateExclusive > s.startDate;
  }
  function state(activity, now = new Date()) {
    if (!validSchedule(activity.schedule)) return 'invalid';
    if (activity.status === 'cancelled') return 'cancelled';
    const s = activity.schedule;
    if (s.kind === 'tentative') return 'tentative';
    if (s.kind === 'timed') return Date.parse(s.end) <= +now ? 'past' : Date.parse(s.start) <= +now ? 'ongoing' : 'upcoming';
    const today = stockholmDate(now);
    return s.endDateExclusive <= today ? 'past' : s.startDate <= today ? 'ongoing' : 'upcoming';
  }
  function sortKey(a) { const s = a.schedule; return s.kind === 'timed' ? Date.parse(s.start) : s.kind === 'allDay' ? Date.parse(s.startDate + 'T12:00:00Z') : Infinity; }
  function selectActivities(items, now = new Date()) {
    const valid = items.filter(a => a && validSchedule(a.schedule));
    const active = valid.filter(a => ['ongoing', 'upcoming'].includes(state(a, now))).sort((a, b) => (state(a, now) === 'ongoing' ? 0 : 1) - (state(b, now) === 'ongoing' ? 0 : 1) || sortKey(a) - sortKey(b));
    return { next: active[0] || null, upcoming: active.slice(1), planned: valid.filter(a => ['tentative', 'cancelled'].includes(state(a, now))), past: valid.filter(a => state(a, now) === 'past').sort((a, b) => sortKey(b) - sortKey(a)) };
  }
  function dateLabel(s) {
    const date = value => new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(new Date(value));
    const time = value => new Intl.DateTimeFormat('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(new Date(value));
    if (s.kind === 'tentative') return s.label;
    if (s.kind === 'allDay') {
      const last = new Date(Date.parse(s.endDateExclusive + 'T12:00:00Z') - 86400000).toISOString().slice(0, 10);
      return date(s.startDate + 'T12:00:00Z') + (last !== s.startDate ? ' – ' + date(last + 'T12:00:00Z') : '') + ' · hela dagen';
    }
    const sameDay = stockholmDate(new Date(s.start)) === stockholmDate(new Date(s.end));
    return date(s.start) + ' · ' + time(s.start) + '–' + (sameDay ? '' : date(s.end) + ' ') + time(s.end);
  }
  function safeUrl(value) {
    try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  }
  function signupOpen(a, now = new Date()) { return ['upcoming', 'ongoing', 'tentative'].includes(state(a, now)) && safeUrl(a.signupUrl) && (!a.signupDeadline || (validTime(a.signupDeadline) && Date.parse(a.signupDeadline) > +now)); }
  function nextMilestone(items, balance) { return items.filter(m => isNumber(m.thresholdSek) && m.thresholdSek > balance && !m.reachedAt).sort((a, b) => a.thresholdSek - b.thresholdSek)[0] || null; }
  const escapeICS = str => String(str).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  function foldLine(line) {
    let out = '', length = 0;
    for (const char of line) { const size = new TextEncoder().encode(char).length; if (length + size > 75) { out += '\r\n '; length = 1; } out += char; length += size; }
    return out;
  }
  const utc = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  function makeICS(a, now = new Date()) {
    if (!validSchedule(a.schedule) || a.schedule.kind === 'tentative') throw new Error('An exact schedule is required');
    const s = a.schedule;
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Klassresa6A//SV', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', 'UID:' + escapeICS(a.id) + '@klassresa5a.github.io', 'DTSTAMP:' + utc(now)];
    if (s.kind === 'timed') lines.push('DTSTART:' + utc(s.start), 'DTEND:' + utc(s.end));
    else lines.push('DTSTART;VALUE=DATE:' + s.startDate.replaceAll('-', ''), 'DTEND;VALUE=DATE:' + s.endDateExclusive.replaceAll('-', ''));
    lines.push('SUMMARY:' + escapeICS(a.title));
    if (a.place) lines.push('LOCATION:' + escapeICS(a.place));
    if (a.description || a.summary) lines.push('DESCRIPTION:' + escapeICS(a.description || a.summary));
    if (safeUrl(a.signupUrl)) lines.push('URL:' + safeUrl(a.signupUrl));
    if (a.status === 'cancelled') lines.push('STATUS:CANCELLED');
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.map(foldLine).join('\r\n') + '\r\n';
  }
  function validate(data) {
    const errors = [], ids = new Set();
    for (const group of ['activities', 'archivedActivities', 'news', 'milestones', 'destinations', 'volunteerTasks']) {
      if (!Array.isArray(data[group])) { errors.push(group + ': expected array'); continue; }
      for (const item of data[group]) {
        if (!item || typeof item.id !== 'string' || !/^[a-z0-9-]+$/.test(item.id) || ids.has(group + ':' + item.id)) { errors.push(group + ': invalid or duplicate id'); continue; }
        ids.add(group + ':' + item.id);
        if (group.includes('Activities') || group === 'activities') {
          if (!item.title || !validSchedule(item.schedule) || !['scheduled', 'cancelled'].includes(item.status)) errors.push(group + ':' + item.id + ': invalid activity');
          if (item.signupDeadline && !validTime(item.signupDeadline)) errors.push(group + ':' + item.id + ': invalid deadline');
        }
        if (item.signupUrl && !safeUrl(item.signupUrl)) errors.push(group + ':' + item.id + ': invalid URL');
        if (item.sourceUrl && !safeUrl(item.sourceUrl)) errors.push(group + ':' + item.id + ': invalid source');
        if (item.activityId && ![...(data.activities || []), ...(data.archivedActivities || [])].some(a => a.id === item.activityId)) errors.push(group + ':' + item.id + ': missing activity');
        if (group === 'news' && !validDate(item.publishedAt)) errors.push('news:' + item.id + ': invalid publication date');
        if (group === 'milestones' && (!isNumber(item.thresholdSek) || item.thresholdSek < 0 || (item.reachedAt && !validDate(item.reachedAt)))) errors.push('milestones:' + item.id + ': invalid threshold or date');
      }
    }
    return errors;
  }
  const api = { TZ, isNumber, money, progress, validDate, validTime, validSchedule, stockholmDate, state, sortKey, selectActivities, dateLabel, safeUrl, signupOpen, nextMilestone, makeICS, foldLine, validate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Klassresa = api;
})(typeof window !== 'undefined' ? window : globalThis);
