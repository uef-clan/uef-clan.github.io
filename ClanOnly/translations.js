let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

const translations = {
    en: {
        headerTitle: "UEF Clan Information",
        headerDescription: "Information for -UEF- members",
        rulesTitle: "Clan Rules",

        generalRuleTitle: "General Rules",
        generalRules: `
            <p><strong>1.</strong> Players of all levels are welcome. Even beginners, as long as they follow the rules. Beginners in a clan can be beneficial for a clan war.<br></p>
            <p><strong>2.</strong> Only strong players participate in clan wars. You can also be strong with Town Hall level 4. For example, ensure your walls and army camps are at level 4. Being strong does not mean Town Hall 8 or higher. We also remove players with level 5 walls or army camps if they have Town Hall 8 or higher. Another example: Town Hall 6 with level 3 army camps is also not acceptable.<br></p>
            <p><strong>3.</strong> Stay active in the clan chat.<br></p>
            <p><strong>4.</strong> Behave normally in the chat. No inappropriate language or childish behavior.<br></p>
        `,

        donationRuleTitle: "Donation Rules",
        donationRules: `
            <p><strong>1.</strong> Donate only what is requested.<br></p>
            <p><strong>2.</strong> Maintain a balanced donation-to-receive ratio. Avoid being just a freeloader.<br></p>
            <p><strong>3.</strong> Do not donate incorrect troops to sabotage war requests.<br></p>
        `,
        
        warRuleTitle: "War Rules",
        warRules: `
            <p><strong>1.</strong> If you do not want or cannot participate in a clan war, do not sign up. If you do sign up, we expect full commitment with 2 attacks.<br></p>
            <p><strong>2.</strong> No one donates to the Clan Castle during wars voluntarily. Follow the donation schedule.<br></p>
            <p><strong>3.</strong> Everyone must attack twice. The first attack within 12 hours according to the attack schedule (see notes by villages), and the second after 12 hours, either to improve an attack or to attack a player who has not yet been attacked.<br></p>
            <p><strong>4.</strong> Ensure your base is well-set up for defense. Ask for advice if you have doubts.<br></p>
        `,

        strategiesTitle: "War Strategies",
        strategiesContent: `
            <strong>Attacking:</strong> At the moment no war.<br>
        `,
        informationTitle: "Information",
        infoContent: `
            <strong>Contact:</strong> We operate a lot using <a href="https://line.me/">Line</a> to discuss clanwar. Username 'uef-frankman' on line.<br>
        `
    },

    nl: {
        headerTitle: "UEF Clan Informatie",
        headerDescription: "Informatie voor -UEF- leden",
        rulesTitle: "Clan Regels",

        generalRuleTitle: "Algemene Regels",
        generalRules: `
            <p><strong>1.</strong> Spelers van alle niveaus zijn welkom. Zelfs beginners, zolang ze zich aan de regels houden. Beginners in een clan kunnen voordelig zijn bij een clanoorlog.<br></p>
            <p><strong>2.</strong> Alleen sterke spelers doen mee aan de clanwar. Je kunt ook sterk zijn met stadhuis level 4. Zorg dat dan bijvoorbeeld je muren op level 4 zijn en legerkampen ook op level 4. Sterk wil niet zeggen stadhuis 8 of hoger. Die verwijderen we ook als je daar muurtjes van level 5 hebt of legerkampen level 5. Ander voorbeeld, stadhuis level 6 met legerkampen level 3 kan ook echt niet.<br></p>
            <p><strong>3.</strong> Blijf actief in de clanchat.<br></p>
            <p><strong>4.</strong> Gedraag je normaal in de chat. Geen ongepast taalgebruik of kinderachtig gedrag.<br></p>
        `,

        donationRuleTitle: "Donatie Regels",
        donationRules: `
            <p><strong>1.</strong> Doneer alleen wat wordt gevraagd.<br></p>
            <p><strong>2.</strong> Zorg voor een gebalanceerde donatieverhouding. Probeer niet alleen een profiteur te zijn.<br></p>
            <p><strong>3.</strong> Doneer geen verkeerde troepen om oorlogsverzoeken te saboteren.<br></p>
        `,
        
        warRuleTitle: "Clanoorlog Regels",
        warRules: `
            <p><strong>1.</strong> Wil of kun je niet meedoen aan een clanoorlog? Meld dan ook niet aan voor clanwar. Indien aanmelding, dan verwachten we volledige inzet met 2 aanvallen.<br></p>
            <p><strong>2.</strong> Niemand doneert uit eigen beweging aan het clankasteel tijdens oorlogen. Volg het donatieschema.<br></p>
            <p><strong>3.</strong> Iedereen valt 2 keer aan. De eerste aanval binnen 12 uur volgens het aanvallenschema (zie briefjes bij dorpen), en de tweede na 12 uur, om een aanval te verbeteren of een nog niet aangevallen speler aan te vallen.<br></p>
            <p><strong>4.</strong> Zorg dat je dorp goed is ingericht voor verdediging. Vraag om advies als je twijfelt.<br></p>
        `,

        strategiesTitle: "War Strategieën",
        strategiesContent: `
            <strong>Aanvallen:</strong> Op dit moment geen war.<br>
        `,
        informationTitle: "Informatie",
        infoContent: `
            <strong>Contact:</strong> We werken ook vooral met <a href="https://line.me/">Line</a> om clanwar te discussiëren. Gebruikersnaam 'uef-frankman' op line.<br>
        `
    }
};

function setLanguage(content) {
    document.getElementById('headerTitle').innerHTML = content.headerTitle;
    document.getElementById('headerDescription').innerHTML = content.headerDescription;
    document.getElementById('rulesTitle').innerHTML = content.rulesTitle;
    document.getElementById('donationRules').innerHTML = content.donationRules;
    document.getElementById('generalRules').innerHTML = content.generalRules;
    document.getElementById('warRules').innerHTML = content.warRules;
    document.getElementById('strategiesTitle').innerHTML = content.strategiesTitle;
    document.getElementById('strategiesContent').innerHTML = content.strategiesContent;
    document.getElementById('informationTitle').innerHTML = content.informationTitle;
    document.getElementById('infoContent').innerHTML = content.infoContent;

    document.getElementById('generalRuleTitle').innerHTML = content.generalRuleTitle;
    document.getElementById('clanwarRuleTitle').innerHTML = content.warRuleTitle;
    document.getElementById('donationRuleTitle').innerHTML = content.donationRuleTitle;
}

function toggleLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('preferredLanguage', language);
    const translation = translations[language];
    
    setLanguage(translation);
    
    document.getElementById('englishBtn').classList.toggle('selected', language === 'en');
    document.getElementById('dutchBtn').classList.toggle('selected', language === 'nl');
}

document.getElementById('englishBtn').addEventListener('click', () => toggleLanguage('en'));
document.getElementById('dutchBtn').addEventListener('click', () => toggleLanguage('nl'));

toggleLanguage(currentLanguage);
