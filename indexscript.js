// misschien geolocation checken om te zien als een nederlander de site bekijkt
// en automatisch de site nederlsands zet
// prioriteit: laag
let currentLanguage = 'en';
const translations = {
    en: {
        siteTitle: "www.uef-clan.eu",
        siteDescription: "Active in Clash of Clans, Clash Royale and Brawl Stars",
        infoTitle: "About Us",
        infoParagraph1: "Information",
        infoParagraph2: "Information part 2",
        newsTitle: "Latest News",
        newsHeadline: "Website Relaunch!",
        newsContent: "The uef-clan website is back online!",
    },
    nl: {
        siteTitle: "www.uef-clan.eu",
        siteDescription: "Actief op Clash of Clans, Clash Royale en Brawl Stars",
        infoTitle: "Over ons",
        infoParagraph1: "Informatie",
        infoParagraph2: "Informatie deel 2",
        newsTitle: "Laatste nieuws",
        newsHeadline: "Website Herlancering!",
        newsContent: "De uef-clan website staat weer online!",
    }
};

function setLanguage(language) {
    currentLanguage = language;
    const translation = translations[language];

    document.getElementById('siteTitle').textContent = translation.siteTitle;
    document.getElementById('siteDescription').textContent = translation.siteDescription;
    document.getElementById('infoTitle').textContent = translation.infoTitle;
    document.getElementById('infoParagraph1').textContent = translation.infoParagraph1;
    document.getElementById('infoParagraph2').textContent = translation.infoParagraph2;
    document.getElementById('newsTitle').textContent = translation.newsTitle;
    document.getElementById('newsHeadline').textContent = translation.newsHeadline;
    document.getElementById('newsContent').textContent = translation.newsContent;

    document.getElementById('englishBtn').classList.toggle('selected', language === 'en');
    document.getElementById('dutchBtn').classList.toggle('selected', language === 'nl');
}

document.getElementById('englishBtn').addEventListener('click', () => setLanguage('en'));
document.getElementById('dutchBtn').addEventListener('click', () => setLanguage('nl'));

setLanguage(currentLanguage);
