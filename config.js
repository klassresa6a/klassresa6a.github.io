// Изменяйте данные здесь. Инструкция и готовые примеры: README.md.
// Даты и время — по Стокгольму. Неизвестные значения оставляйте null.
window.KLASSRESA_CONFIG = {
  className: '6A',
  finance: { balanceSek: 26731, goalSek: 50000, balanceUpdatedAt: null },
  contact: { email: 'gingit.scully@gmail.com' },
  activities: [
    { id: 'halloween-2026', title: 'Halloween', schedule: { kind: 'allDay', startDate: '2026-11-08', endDateExclusive: '2026-11-09' }, timePending: true, status: 'scheduled', summary: 'Lokalen är bokad. Mer information om aktiviteter, snacks och föräldrahjälp kommer. Klockslag meddelas senare.' },
    { id: 'kanelbullens-dag-2026', title: 'Kanelbullens dag', schedule: { kind: 'tentative', label: 'Oktober 2026 · datum inte bestämt' }, status: 'scheduled', summary: 'Vi planerar en aktivitet eller försäljning i samband med Kanelbullens dag. Mer information kommer.', description: 'Kanelbullens dag är söndag 4 oktober. Om vi ordnar något i skolan på fredagen är det 2 oktober. Datum och upplägg är ännu inte bestämda.' }
  ],
  volunteerTasks: [],
  news: [],
  milestones: [
    { id: 'start', title: 'Vi är på väg', thresholdSek: 0 },
    { id: 'halloween', title: 'Halloweenfest', thresholdSek: 10000 },
    { id: 'film', title: 'Filmkväll', thresholdSek: 15000 },
    { id: 'icecream', title: 'Glassfest', thresholdSek: 30000 },
    { id: 'disco', title: 'Discofest', thresholdSek: 40000 },
    { id: 'trip', title: 'Klassresan', thresholdSek: 50000 }
  ],
  destinations: [
    {
      id: 'boda-borg', name: 'Boda Borg · 100% Questar', tag: 'Huvudalternativ · förfrågan skickad',
      location: 'Oxelösund', duration: 'Till nästa morgon', nights: 1,
      priceMinSek: null, priceMaxSek: null, priceNote: 'Vi inväntar offert och besked om tillgängligt datum för 2027.',
      summary: 'Boda Borg är vårt huvudalternativ för klassresan. En förfrågan med övernattning för 24 barn och 4 vuxna är skickad för 21–22 maj eller 28–29 maj 2027. Datum, pris och bokning är ännu inte bekräftade.',
      includes: ['Questar på dagen och kvällspass kl. 18–20.', 'Tacobuffé, fika, middag och frukost.', 'Prisutdelning, filmkväll och en natt på vandrarhem.'],
      extras: ['Pris enligt broschyren för 2026: 1 245 kr/elev och 720 kr/medföljande vuxen.', '10 % rabatt på elevpriset vid ankomst måndag–torsdag enligt 2026 års villkor.', 'Transport till och från Oxelösund behöver budgeteras separat. Vi städar själva.', 'Aktiviteter efter frukost dag 2 ingår inte i grundpaketet 100% Questar. Eventuella tillägg och hemresetid bestäms vid bokning.', 'Bekräfta pris för vårt resår, datum, antal elever och vuxna samt sänglinne och handdukar vid offert.'],
      checkedAt: '2026-09-12', sourceLabel: 'Se paketet i klassresebroschyren 2026 (PDF)',
      sourceUrl: 'https://www.bodaborg.se/oxelosund/wp-content/uploads/sites/5/2024/07/KLASSRESEBROSCHYR-2026.pdf#page=9'
    }
  ],
  // Исторические записи не доказывают, что событие состоялось.
  archivedActivities: [
    { id: 'kakservice-2025', title: 'Start försäljning · Kakservice', schedule: { kind: 'allDay', startDate: '2025-09-29', endDateExclusive: '2025-09-30' }, status: 'scheduled', summary: 'Tidigare försäljning från klassens planering.' },
    { id: 'orders-2025', title: 'Sista beställningsdag', schedule: { kind: 'allDay', startDate: '2025-10-16', endDateExclusive: '2025-10-17' }, status: 'scheduled', summary: 'Beställningsdag i den tidigare försäljningen.' },
    { id: 'halloween-2025', title: 'Halloweenfest', schedule: { kind: 'timed', start: '2025-11-15T15:00:00+01:00', end: '2025-11-15T18:00:00+01:00' }, status: 'scheduled', place: 'Lokalen, Tunnlandsvägen 97', summary: 'Mat, snacks och tävlingar. Föräldrar kunde köpa fika till stöd för klasskassan.', signupUrl: 'https://forms.gle/Vs9YYu265sg8CKM36' },
    { id: 'fikakassan-2026', title: 'Fikakassan försäljning', schedule: { kind: 'tentative', label: 'Mars 2026' }, status: 'scheduled', summary: 'Äldre försäljningsperiod. Slutdatum skiljer sig i den tidigare planeringen.', signupUrl: 'https://fikakassan.se/portal/signup_seller/WTemmujgKTXzpYzJelLB/' },
    { id: 'film-2026', title: 'Filmkväll · A Minecraft Movie', schedule: { kind: 'timed', start: '2026-03-22T15:30:00+01:00', end: '2026-03-22T18:00:00+01:00' }, status: 'scheduled', place: 'Lokalen, Tunnlandsvägen 97', summary: 'En planerad filmkväll med popcorn, chips och dricka som tack för klassens insatser.', signupUrl: 'https://forms.gle/i9yKtNpYMkemE9w66' },
    { id: 'cleanup-2026', title: 'Bromma Vårstädning', schedule: { kind: 'timed', start: '2026-04-18T10:00:00+02:00', end: '2026-04-18T13:00:00+02:00' }, status: 'scheduled', place: 'Bromma, Riksby', summary: 'Planerad städning av område BRO30. Den tidigare informationen angav en ersättning på 3 000 kr; det är inte en separat verifierad bokföringspost.', signupUrl: 'https://forms.gle/PTYpKLqFAQ7bMf3j9' },
    { id: 'picnic-2026', title: 'Sommarpicknick', schedule: { kind: 'tentative', label: 'Juni 2026 · tidigare idé' }, status: 'scheduled', summary: 'Sparad från den tidigare planeringen. Genomförande är inte bekräftat.' },
    { id: 'loppis-2026', title: 'Garageloppis', schedule: { kind: 'tentative', label: 'Hösten 2026 · tidigare idé' }, status: 'scheduled', summary: 'Sparad från den tidigare planeringen. Inget nytt datum är bestämt.' }
  ]
};
