let warData = {};
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

document.getElementById('goBackBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

const translations = {
    en: {
        comeback: "come back later",
        warEnded: "War Ended",
        preparation: "War Preparation",
        warOngoing: "War Ongoing",
        clanName: "Clan Name",
        clanLevel: "Clan Level",
        clanStars: "Stars",
        clanAttacks: "Attacks",
        clanDestruction: "Destruction",
        opponentName: "Opponent Name",
        opponentLevel: "Opponent Level",
        opponentStars: "Stars",
        opponentAttacks: "Attacked by opponent",
        opponentDestruction: "Destruction",
        attack: "Attack",
        bestOpponentAttack: "Best Opponent Attack",
        noAttack: "Not Attack",
        goBack: "Go Back"
    },
    nl: {
        comeback: "kom later terug",
        warEnded: "War Afgelopen",
        preparation: "War Voorbereiding",
        warOngoing: "War Bezig",
        clanName: "Clan Naam",
        clanLevel: "Clan Niveau",
        clanStars: "Sterren",
        clanAttacks: "Aanvallen",
        clanDestruction: "Verwoesting",
        opponentName: "Tegenstander Naam",
        opponentLevel: "Tegenstander Niveau",
        opponentStars: "Sterren",
        opponentAttacks: "Aangevallen door tegenstander",
        opponentDestruction: "Verwoesting",
        attack: "Aanval",
        bestOpponentAttack: "Beste Tegenstander Aanval",
        noAttack: "Nog Niet Aangevallen",
        goBack: "Terug"
    },
};

async function fetchClanWarData() {
    try {
        const url = 'https://uef-clan.github.io/uef-data/warResponse.json';
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        warData = data;
        
        populateWarDetails();
    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
    }
}

function populateWarDetails() {
    const lang = translations[currentLanguage];
    document.getElementById("goBackBtn").textContent = lang.goBack;
    if (!warData.state || warData.state.toLowerCase() === "preparation") {
        document.getElementById('warState').textContent = `${lang.preparation}, ${lang.comeback}`;
        document.getElementById('clanBadge').src = warData.clan.badgeUrls?.medium || '';
        document.getElementById('opponentBadge').src = warData.opponent?.badgeUrls?.medium || '';

        document.getElementById('clanName').textContent = warData.clan.name;
        document.getElementById('clanLevel').textContent = `${lang.clanLevel} ${warData.clan.clanLevel}`;
        document.getElementById('opponentName').textContent = warData.opponent?.name || '';
        document.getElementById('opponentLevel').textContent = `${lang.opponentLevel}: ${warData.opponent?.clanLevel || ''}`;

        return;
    }

    document.getElementById('warState').textContent = warData.state === "warEnded" ? lang.warEnded : lang.warOngoing;

    document.getElementById('clanBadge').src = warData.clan.badgeUrls?.medium || '';
    document.getElementById('opponentBadge').src = warData.opponent?.badgeUrls?.medium || '';

    document.getElementById('clanName').textContent = warData.clan.name;
    document.getElementById('clanLevel').textContent = `${lang.clanLevel} ${warData.clan.clanLevel}`;
    document.getElementById('clanStars').textContent = `${lang.clanStars}: ${warData.clan.stars}`;
    document.getElementById('clanAttacks').textContent = `${lang.clanAttacks}: ${warData.clan.attacks}`;
    document.getElementById('clanDestruction').textContent = `${lang.clanDestruction}: ${warData.clan.destructionPercentage.toFixed(2)}%`;
    document.getElementById('opponentName').textContent = warData.opponent?.name || '';
    document.getElementById('opponentLevel').textContent = `${lang.opponentLevel}: ${warData.opponent?.clanLevel || ''}`;
    document.getElementById('opponentStars').textContent = `${lang.opponentStars}: ${warData.opponent?.stars || ''}`;
    document.getElementById('opponentAttacks').textContent = `${lang.opponentAttacks}: ${warData.opponent?.attacks || ''}`;
    document.getElementById('opponentDestruction').textContent = `${lang.opponentDestruction}: ${warData.opponent?.destructionPercentage?.toFixed(2) || ''}%`;

    populateMemberList(warData.clan.members, 'clanMembersList');
    populateMemberList(warData.opponent?.members || [], 'opponentMembersList');
}

function populateMemberList(members, listId) {
    const list = document.getElementById(listId);
    list.innerHTML = '';

    members.sort((a, b) => a.mapPosition - b.mapPosition);

    members.forEach(member => {
        const listItem = document.createElement('li');


        const memberSummary = `
            <div class="member-summary">
                <strong>${member.name}</strong> (TH ${member.townhallLevel})
            </div>
        `;

        let attackDetails = '';
        const lang = translations[currentLanguage];
        if (member.attacks && member.attacks.length > 0) {
            member.attacks.forEach((attack, index) => {
                attackDetails += `
                    <div class="attack-details">
                        <p><strong>${lang.attack} ${index + 1}:</strong> ${attack.stars} ${lang.clanStars}, ${attack.destructionPercentage}% ${lang.clanDestruction}</p>
                    </div>
                `;
            });
        } else {
            attackDetails = `
                <div class="attack-details">
                    <p><strong>${lang.attack}:</strong> ${lang.noAttack}</p>
                </div>
            `;
        }

        const bestOpponentAttack = member.bestOpponentAttack ? `
            <div class="attack-details">
                <p><strong>${lang.bestOpponentAttack}:</strong> ${member.bestOpponentAttack.stars} ${lang.clanStars}, ${member.bestOpponentAttack.destructionPercentage}% ${lang.clanDestruction}</p>
            </div>
        ` : `
            <div class="attack-details">
                <p><strong>${lang.bestOpponentAttack}:</strong> ${lang.noAttack}</p>
            </div>
        `;

        const memberDetails = `
            <div class="member-details">
                <p>${lang.opponentAttacks}: ${member.opponentAttacks || '0'}</p>
                ${attackDetails}
                ${bestOpponentAttack}
            </div>
        `;

        listItem.innerHTML = memberSummary + memberDetails;

        listItem.addEventListener('click', () => {
            const details = listItem.querySelector('.member-details');
            details.classList.toggle('expanded');
        });

        list.appendChild(listItem);
    });
}


function toggleLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('preferredLanguage', language);

    document.getElementById('englishBtn').classList.toggle('selected', language === 'en');
    document.getElementById('dutchBtn').classList.toggle('selected', language === 'nl');

    populateWarDetails();
}


document.getElementById('englishBtn').addEventListener('click', () => toggleLanguage('en'));
document.getElementById('dutchBtn').addEventListener('click', () => toggleLanguage('nl'));

fetchClanWarData();
toggleLanguage(currentLanguage);