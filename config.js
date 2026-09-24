// Изменяйте данные здесь. Инструкция и готовые примеры: README.md.
// Даты и время — по Стокгольму. Неизвестные значения оставляйте null.
window.KLASSRESA_CONFIG = {
  className: '6A',
  finance: { balanceSek: 26731, goalSek: 50000, balanceUpdatedAt: null },
  contact: { email: 'gingit.scully@gmail.com' },
  activities: [
    { id: 'halloween-2026', title: 'Halloween', schedule: { kind: 'allDay', startDate: '2026-11-08', endDateExclusive: '2026-11-09' }, timePending: true, status: 'scheduled', summary: 'Lokalen är bokad. Mer information om aktiviteter, snacks och föräldrahjälp kommer. Klockslag meddelas senare.' },
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
      id: 'boda-borg', name: 'Boda Camp Questar & Spök', tag: 'Huvudalternativ · förfrågan skickad',
      location: 'Boda Borg och Boda Camp, Oxelösund', duration: 'Två dagar', nights: 1,
      priceMinSek: 1290, priceMaxSek: null,
      priceNote: 'Preliminärt enligt paketkalkylen. Pris och tillgänglighet för maj 2027 inväntar bekräftelse.',
      budgetSummary: 'Medföljande vuxen: 785 kr. Grundpaket för 24 elever och 4 vuxna: 34 100 kr (30 960 kr + 3 140 kr). Resan till och från Oxelösund och eventuella tillval tillkommer.',
      summary: 'Vårt huvudalternativ är Boda Camp Questar & Spök: Questar på Boda Borg, Spökvind och en natt i tält på Boda Camp. Förfrågan för 24 barn och 4 vuxna är skickad för 21–22 maj eller 28–29 maj 2027. Bokning och datum är ännu inte bekräftade.',
      includes: ['Questar i 5 timmar på Boda Borg.', 'Tacobuffé och fika med bulle.', 'Prisutdelning för eleverna.', 'Vildmarkspanna, Spökvind för eleverna och korvgrillning.', 'En natt i tält på Boda Camp och frukost.'],
      addOns: ['Saltotrampolin: +110 kr/elev.', 'Klättervägg: +110 kr/elev.', 'Bananbåt: +230 kr/elev.', 'Kajak: +210 kr/elev.', 'Terrängbana: +230 kr/elev.', 'Vid val av bananbåt, kajak eller terrängbana lägger kalkylatorn automatiskt till hamburgarlunch. Lunchkostnaden behöver räknas med utöver aktivitetspriset och bekräftas i offerten.'],
      extras: ['Tillvalen är inte bokade och ingår inte i grundpriset 34 100 kr.', 'Transport till och från Oxelösund behöver budgeteras separat. Bekräfta även transporten mellan Boda Borg och Boda Camp.', 'Program efter frukost, tillval och hemresetid bestäms vid bokning.', 'Bekräfta 2027 års priser, vad som ingår för vuxna samt villkor för städning, sänglinne och handdukar.'],
      checkedAt: '2026-09-19', sourceLabel: 'Läs om klassresor hos Boda Borg',
      sourceUrl: 'https://www.bodaborg.se/oxelosund/packages/allt-om-klassresor/'
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
