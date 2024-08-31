let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

const translations = {
    en: {
        siteTitle: "www.uef-clan.eu",
        siteDescription: "Active on Clash of Clans, Clash Royale and Brawl Stars",
        infoTitle: "About Us",
        newsTitle: "Latest News",
        newsHeadline: "Website Relaunch!",
        newsContent: "The uef-clan website is back online!",
    },
    nl: {
        siteTitle: "www.uef-clan.eu",
        siteDescription: "Actief op Clash of Clans, Clash Royale en Brawl Stars",
        infoTitle: "Over ons",
        newsTitle: "Laatste nieuws",
        newsHeadline: "Website Herlancering!",
        newsContent: "De uef-clan website staat weer online!",
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
