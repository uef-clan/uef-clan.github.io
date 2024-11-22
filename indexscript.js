let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

const translations = {
    en: {
        siteTitle: "www.uef-clan.eu",
        siteDescription: "Active at Clash of Clans, Clash Royale and Brawl Stars",
        infoTitle: "About Us",
        newsTitle: "Latest News",
        newsHeadline: "Clan Games",
        newsContent: "The clan games started again! Try to earn as much points as possible so we can get all the rewards. If you earn 4000 points (the max) then you can choose and extra bonus reward!",
    },
    nl: {
        siteTitle: "www.uef-clan.eu",
        siteDescription: "Actief op Clash of Clans, Clash Royale en Brawl Stars",
        infoTitle: "Over ons",
        newsTitle: "Laatste nieuws",
        newsHeadline: "Clan Spelen",
        newsContent: "De clan spelen zijn weer begonnen! Probeer zoveel mogelijk punten te halen zodat we alle rewards kunnen krijgen. Als je 4000 punten haalt (de max) mag je een extra beloning kiezen!",
    }
};

function toggleLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('preferredLanguage', language);
    const translation = translations[language];

    document.getElementById('siteTitle').textContent = translation.siteTitle;
    document.getElementById('siteDescription').textContent = translation.siteDescription;
    document.getElementById('infoTitle').textContent = translation.infoTitle;
    document.getElementById('newsTitle').textContent = translation.newsTitle;
    document.getElementById('newsHeadline').textContent = translation.newsHeadline;
    document.getElementById('newsContent').textContent = translation.newsContent;

    document.getElementById('englishBtn').classList.toggle('selected', language === 'en');
    document.getElementById('dutchBtn').classList.toggle('selected', language === 'nl');
    
    const filePath = language === 'en' ? 'info_EN.txt' : 'info_NL.txt';
    loadInfoText(filePath);
}

function loadInfoText(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const paragraphs = data.split('\n\n');

            document.getElementById('infoParagraph1').textContent = paragraphs[0] || '';
            document.getElementById('infoParagraph2').textContent = paragraphs[1] || '';
        })
        .catch(error => console.error('Error loading the information text:', error));
}

document.getElementById('englishBtn').addEventListener('click', () => toggleLanguage('en'));
document.getElementById('dutchBtn').addEventListener('click', () => toggleLanguage('nl'));

toggleLanguage(currentLanguage);