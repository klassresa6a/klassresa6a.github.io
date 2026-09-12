// Изменяйте данные здесь. Инструкция и готовые примеры: README.md.
// Даты и время — по Стокгольму. Неизвестные значения оставляйте null.
window.KLASSRESA_CONFIG = {
  className: '6A',
  finance: { balanceSek: 26731, goalSek: 50000, balanceUpdatedAt: null },
  contact: { email: 'gingit.scully@gmail.com' },
  activities: [],
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
      id: 'nearby', name: 'Äventyr i närområdet', tag: 'Lägst uppskattad kostnad',
      location: 'I eller nära Stockholm', duration: 'En dag', nights: 0,
      priceMinSek: 300, priceMaxSek: 800,
      summary: 'En gemensam utflykt med plats för lek, upptäckter och tid tillsammans.',
      includes: ['Heldagsutflykt utan övernattning', 'Aktivitet väljs tillsammans'],
      extras: ['Transport, mat och inträden behöver räknas in i den slutliga budgeten.'],
      checkedAt: null, sourceLabel: 'Tidigare uppskattning på klassens sida',
      sourceUrl: 'https://klassresa5a.github.io/'
    },
    {
      id: 'galo', name: 'Gålö Havsbad', tag: 'Stugäventyr vid havet',
      location: 'Gålö, Stockholms skärgård', duration: 'Två dagar', nights: 1,
      priceMinSek: 695, priceMaxSek: null, priceUnit: 'person',
      summary: 'En natt i stuga, lek och upptäckter vid havet! Gålö Bas är alternativet för oss som vill laga mat och ordna aktiviteter tillsammans.',
      includes: ['Gålö Bas: en natt i stuga och samlingslokal under vistelsen.', 'Uteleksaker och tillgång till spelhallen under öppettiderna.', 'Möjlighet till tipsrunda, skogspromenader och havsbad.'],
      extras: ['Självhushåll och egen städning. Mat och transport behöver budgeteras separat.', 'Helgtillägg: 100 kr/person natt till lördag, 200 kr/person natt till söndag.', 'Gålö Standard med en natt kostar från 1 295 kr/person och inkluderar tre måltider, två timmars prova-på med kajak, kanot och SUP samt minigolf.', 'Begär offert för vårt datum och antal elever och vuxna. Kontrollera även sänglinne och handdukar.'],
      checkedAt: '2026-09-12', sourceLabel: 'Se paket och priser hos Gålö Havsbad',
      sourceUrl: 'https://galohavsbad.se/grupper/skolklasser/'
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
