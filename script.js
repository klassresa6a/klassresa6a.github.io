(function () {
  'use strict';
  const C = window.Klassresa, data = window.KLASSRESA_CONFIG;
  if (!C || !data) return;
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; };
  const append = (parent, ...children) => { children.filter(Boolean).forEach(child => parent.append(child)); return parent; };
  const arr = key => Array.isArray(data[key]) ? data[key] : [];
  const now = new Date();
  let toastTimer;
  function notify(message) { $('status').textContent = message; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('status').textContent = '', 4500); }
  function link(label, url, cls = 'button') { const a = el('a', cls, label); a.href = url; return a; }
  function button(label, fn, cls = 'button secondary') { const b = el('button', cls, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
  function details(label, ...content) { return append(el('details'), el('summary', '', label), ...content); }
function sectionGuard(id, render) {
  const container = $(id);

  // Раздел может быть удалён из HTML.
  if (!container) return;

  try {
    render();
  } catch (error) {
    console.error(id, error);

    container.replaceChildren(
      el('p', 'fine', 'Uppgifterna kunde inte visas just nu.')
    );
  }
}
  const errors = C.validate(data);
  if (errors.length) console.warn('Kontrollera config.js:', errors);
  document.querySelectorAll('[data-class]').forEach(n => n.textContent = data.className || '6A');
  const email = data.contact?.email;
  if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.querySelectorAll('.contact-email').forEach(a => { a.textContent = email; a.href = 'mailto:' + email; });
    const helpContact = $('help-contact');

if (helpContact) {
  helpContact.href = 'mailto:' + email;
}
  } else { document.querySelectorAll('.contact-email, #help-contact').forEach(a => a.hidden = true); }
  sectionGuard('finance', () => {
    const result = C.progress(data.finance?.balanceSek, data.finance?.goalSek), box = $('finance'); box.replaceChildren();
    if (result.error) { box.append(el('p', '', 'Uppgifterna kunde inte visas just nu.')); return; }
    append(box, el('div', 'balance', C.money(result.balance)), el('p', 'balance-caption', 'i klasskassan'));
    if (result.validGoal) {
      const bar = el('progress'); bar.max = 100; bar.value = result.visual; bar.setAttribute('aria-label', result.displayed + ' procent av målet');
      append(box, bar, append(el('div', 'progress-info'), el('strong', '', result.displayed + ' % av målet'), el('span', '', 'Mål: ' + C.money(result.goal))));
      append(box, append(el('div', 'fund-bottom'), el('strong', '', result.remaining ? C.money(result.remaining) + ' kvar' : 'Målet är nått!'), el('span', '', 'Vi gör det tillsammans.')));
    } else box.append(el('p', '', 'Insamlingsmål kommer snart.'));
    const updated = data.finance.balanceUpdatedAt;
    box.append(el('p', 'fine', C.validDate(updated) ? 'Saldo uppdaterat ' + updated : 'Senast kända saldo · uppdateringsdatum saknas'));
  });
  function saveCalendar(a) {
    try { const url = URL.createObjectURL(new Blob([C.makeICS(a)], { type: 'text/calendar;charset=utf-8' })); const download = link('', url); download.download = a.id + '.ics'; document.body.append(download); download.click(); download.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000); notify('Kalenderfilen är klar att öppna.'); } catch { notify('Kalenderfilen kunde inte skapas.'); }
  }
  async function share(a, box) {
    const url = new URL(location.href); url.hash = 'activity-' + a.id;
    if (location.protocol !== 'file:') {
      try { await navigator.clipboard.writeText(url.href); notify('Länken är kopierad.'); return; } catch { /* selectable fallback */ }
    }
    box.querySelector('.share-fallback')?.remove();
    const note = el('p', 'share-fallback', location.protocol === 'file:' ? 'En delbar länk finns när sidan har publicerats.' : url.href); box.append(note);
  }
  function activityCard(a, archived = false, featured = false) {
    const card = el('article', featured ? 'activity' : 'card activity'); card.id = 'activity-' + a.id;
    const st = C.state(a, now);
    append(card, el('span', 'badge', st === 'cancelled' ? 'Inställd' : archived ? (a.result ? 'Genomförd' : 'Tidigare planering') : st === 'ongoing' ? 'Pågår nu' : st === 'tentative' ? 'Planeras' : 'Kommande'), el('h3', '', a.title), el('p', 'meta', C.dateLabel(a.schedule)), a.place ? el('p', 'meta', a.place) : null, el('p', '', a.summary || ''));
    if (a.description) card.append(details('Visa detaljer', el('p', 'description', a.description)));
    if (a.result) append(card, el('p', 'fine', a.result.text || ''), C.isNumber(a.result.netIncomeSek) ? el('strong', '', 'Till klasskassan: ' + C.money(a.result.netIncomeSek)) : null);
    if (!archived && st !== 'cancelled') {
      if (C.validTime(a.signupDeadline)) card.append(el('p', 'fine', (Date.parse(a.signupDeadline) > +now ? 'Anmäl senast ' : 'Anmälan stängde ') + new Intl.DateTimeFormat('sv-SE', { dateStyle: 'medium', timeStyle: 'short', timeZone: C.TZ }).format(new Date(a.signupDeadline))));
      const actions = el('div', 'actions');
      if (C.signupOpen(a, now)) actions.append(link('Anmäl dig', C.safeUrl(a.signupUrl)));
      if (['upcoming', 'ongoing'].includes(st)) actions.append(button('Lägg till i kalendern', () => saveCalendar(a)));
      actions.append(button('Kopiera länk', () => share(a, card), 'button text-button'));
      card.append(actions);
    }
    return card;
  }
  sectionGuard('next-activity', () => {
    const split = C.selectActivities(arr('activities'), now), box = $('next-activity'); box.replaceChildren();
    if (split.next) box.append(activityCard(split.next, false, true));
    else {
      const empty = el('div', 'empty');
      // Calendar icon, a functional empty-state symbol.
      const icon = el('div', 'empty-calendar'); icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h3m4 0h3"/></svg>';
      append(empty, icon, el('h3', '', 'Nästa uppdrag kluras ut!'), el('p', '', 'Just nu laddar vi för nästa aktivitet. Datum och anmälan dyker upp här när planen är klar.'), el('p', 'small-note', 'Har du en idé? Hör gärna av dig till klassföräldrarna.')); box.append(empty);
    }
    for (const [id, list] of [['upcoming', split.upcoming], ['planned', split.planned]]) { $(id).replaceChildren(...list.map(a => activityCard(a))); $(id + '-section').hidden = !list.length; }
    const historic = [...split.past, ...arr('archivedActivities').filter(a => a && C.validSchedule(a.schedule))];
    const unique = [...new Map(historic.map(a => [a.id, a])).values()].sort((a, b) => { const ka = C.sortKey(a), kb = C.sortKey(b); return (Number.isFinite(kb) ? kb : 0) - (Number.isFinite(ka) ? ka : 0); });
    $('archive').replaceChildren(...unique.map(a => activityCard(a, true))); $('archive-count').textContent = String(unique.length);
  });
  sectionGuard('tasks', () => {
    arr('volunteerTasks').forEach(task => {
      const a = arr('activities').find(a => a.id === task.activityId);
      if (task.activityId && (!a || ['past', 'cancelled', 'invalid'].includes(C.state(a, now)))) return;
      const card = append(el('article', 'card'), el('h3', '', task.title), el('p', '', task.description || ''));
      if (C.safeUrl(task.signupUrl)) card.append(link('Jag kan hjälpa till', C.safeUrl(task.signupUrl), 'button secondary'));
      if (task.sourceMode === 'manual' && C.isNumber(task.capacity) && task.capacity > 0 && C.isNumber(task.filled) && task.filled >= 0 && task.filled <= task.capacity && C.validDate(task.updatedAt)) card.append(el('p', 'fine', task.filled + ' av ' + task.capacity + ' platser fyllda · Uppdateras manuellt · ' + task.updatedAt));
      $('tasks').append(card);
    });
  });
  sectionGuard('next-milestone', () => {
    const milestones = arr('milestones').filter(m => m && C.isNumber(m.thresholdSek)).sort((a, b) => a.thresholdSek - b.thresholdSek), balance = data.finance?.balanceSek;
    if (!C.isNumber(balance)) { $('next-milestone').append(el('p', 'fine', 'Uppgifterna kunde inte visas just nu.')); return; }
    const next = C.nextMilestone(milestones, balance), block = el('div', 'milestone-current');
    const symbol = el('span', 'milestone-symbol', next ? '✦' : '✓'); symbol.setAttribute('aria-hidden', 'true');
    append(block, symbol, append(el('div'), el('p', 'label', next ? 'Nästa stopp på kartan' : 'Tillsammans hela vägen'), el('h3', '', next ? next.title : 'Alla delmål är nådda'), el('p', 'fine', next ? 'Vid ' + C.money(next.thresholdSek) : 'Vilken gemensam insats!')));
    if (next) block.append(append(el('div', 'remainder'), el('span', '', C.money(Math.max(next.thresholdSek - balance, 0))), el('small', '', 'kvar till nästa stopp')));
    $('next-milestone').replaceChildren(block);
    const symbols = { start: '🏁', halloween: '🎃', film: '🍿', icecream: '🍦', disco: '🪩', trip: '🎒' };
    milestones.forEach((m, index) => {
      const reached = C.validDate(m.reachedAt) || balance >= m.thresholdSek;
      const current = next && next.id === m.id;
      const stop = el('li', 'route-stop' + (reached ? ' achieved' : '') + (current ? ' next-stop' : ''));
      const marker = el('span', 'stop-marker', symbols[m.id] || '⭐'); marker.setAttribute('aria-hidden', 'true');
      const info = append(el('div', 'stop-info'), el('span', 'stop-label', current ? 'NÄSTA STOPP' : index === milestones.length - 1 ? 'SLUTMÅLET' : 'STOPP ' + String(index + 1).padStart(2, '0')), el('strong', '', m.title), el('span', 'stop-price', C.money(m.thresholdSek)));
      const status = C.validDate(m.reachedAt) ? '✓ Uppnått ' + m.reachedAt : reached ? '✓ Beloppet uppnått' : 'På vägen framför oss';
      info.append(el('small', 'stop-state', status));
      if (current) info.append(el('span', 'here-badge', '🚌 Vi är på väg hit!'));
      append(stop, marker, info); $('milestones').append(stop);
    });
  });
  sectionGuard('destinations', () => {
    arr('destinations').slice().sort((a, b) => (C.isNumber(a.priceMinSek) ? a.priceMinSek : Infinity) - (C.isNumber(b.priceMinSek) ? b.priceMinSek : Infinity)).forEach((d, index) => {
      const top = append(el('div', 'destination-top'), el('span', 'destination-tag', d.tag || 'Residé'), el('p', 'destination-number', 'FÖRSLAG ' + String(index + 1).padStart(2, '0')), el('h3', '', d.name));
      const body = append(el('div', 'destination-body'), el('p', '', d.summary));
      append(body, append(el('div', 'chips'), ...[d.location, d.duration, d.nights === 0 ? 'Ingen övernattning' : d.nights ? d.nights + ' nätter' : null].filter(Boolean).map(text => el('span', 'chip', text))));
      const price = el('div', 'price');
      price.append(document.createTextNode(C.isNumber(d.priceMinSek) && C.isNumber(d.priceMaxSek) ? new Intl.NumberFormat('sv-SE').format(d.priceMinSek) + '–' + C.money(d.priceMaxSek) : 'Pris kommer senare'));
      price.append(el('small', '', ' / elev')); append(body, price, el('div', 'price-note', d.checkedAt ? 'Prisuppgift kontrollerad ' + d.checkedAt : 'Äldre uppskattning · behöver kontrolleras'));
      const more = details('Vad behöver vi planera?');
      for (const [title, values] of [['Upplägg att utgå från', d.includes], ['Kostnader att kontrollera', d.extras]]) { append(more, el('h4', '', title), append(el('ul'), ...(Array.isArray(values) ? values : []).map(v => el('li', '', v)))); }
      more.append(el('p', 'fine', 'Totalpriset beror på upplägg, antal elever och medföljande vuxna.'));
      if (C.safeUrl(d.sourceUrl)) more.append(link(d.sourceLabel || 'Källa', C.safeUrl(d.sourceUrl), 'button text-button'));
      body.append(more); $('destinations').append(append(el('article', 'card destination'), top, body));
    });
  });
  sectionGuard('news', () => {
    const items = arr('news').filter(n => n && C.validDate(n.publishedAt) && n.publishedAt <= C.stockholmDate(now)).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    if (!items.length) { $('news').append(append(el('div', 'news-empty'), el('strong', '', 'Radiotystnad i baslägret.'), el('p', '', 'Just nu finns inga nya meddelanden. Nästa plan, idé eller hälsning dyker upp här.'))); return; }
    items.forEach((n, i) => { const time = el('time', '', n.publishedAt); time.dateTime = n.publishedAt; const card = append(el('article', 'news-item'), time, el('h3', '', n.title), el('p', '', n.summary || '')); if (n.body) card.append(details('Läs mer', el('p', 'description', n.body))); if (n.activityId && [...arr('activities'), ...arr('archivedActivities')].some(a => a.id === n.activityId)) card.append(link('Visa aktiviteten', '#activity-' + n.activityId, 'button text-button')); $(i < 2 ? 'news' : 'older-news').append(card); }); $('more-news').hidden = items.length <= 2;
  });
  let celebrationTimer;
  $('celebrate').addEventListener('click', () => {
    notify('Bra jobbat, klass ' + (data.className || '6A') + '! Varje insats räknas.');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearTimeout(celebrationTimer); $('confetti').replaceChildren();
    for (let i = 0; i < 35; i++) { const particle = el('i'); particle.style.left = Math.random() * 100 + '%'; particle.style.backgroundColor = ['#f4c95d', '#086b68', '#689dcc'][i % 3]; particle.style.animationDelay = Math.random() * .3 + 's'; $('confetti').append(particle); }
    celebrationTimer = setTimeout(() => $('confetti').replaceChildren(), 2200);
  });
  function revealHash() { let hash; try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; } const target = document.getElementById(hash); if (!target) return; for (let p = target.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true; if (hash.startsWith('activity-')) { target.querySelectorAll('details').forEach(d => d.open = true); target.scrollIntoView({ block: 'start' }); } }
  window.addEventListener('hashchange', revealHash); revealHash();
})();
