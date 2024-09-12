const clanData = {};

async function fetchMembers() {
    try {
        const url = 'https://raw.githubusercontent.com/uef-clan/uef-data/main/response.json';
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        clanData.memberList = data.memberList || [];
        clanData.badgeUrls = data.badgeUrls || {};

        populateDropdown();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateDropdown() {
    const rolePriority = {
        'Leader': 1,
        'Co-Leader': 2,
        'Elder': 3,
        'Member': 4
    };

    const dropdown = document.getElementById("clanMembersDropdown");
    dropdown.innerHTML = '';

    clanData.memberList.sort((a, b) => {
        const roleA = translations[currentLanguage].roles[a.role];
        const roleB = translations[currentLanguage].roles[b.role];
        return rolePriority[roleA] - rolePriority[roleB];
    });

    clanData.memberList.forEach(member => {
        const option = document.createElement("option");
        option.value = member.tag;
        option.textContent = member.name;
        dropdown.appendChild(option);
    });

    dropdown.insertAdjacentHTML('afterbegin', `<option value="">${translations[currentLanguage].selectMember}</option>`);
    dropdown.selectedIndex = "0";
}

function getRoleName(roleIndex) {
    const roles = translations[currentLanguage].roles;
    return roles[roleIndex] || translations[currentLanguage].roles['unknown'];
}

function updateProfile(selectedMember) {
    const profileSection = document.getElementById("profileSection");
    const clanBadge = document.getElementById("clanBadge");
    const townHallImage = document.getElementById("townHallImage");
    const playerName = document.getElementById("playerName");
    const role = document.getElementById("role");
    const trophies = document.getElementById("trophies");
    const leagueName = document.getElementById("leagueName");

    if (selectedMember) {
        playerName.textContent = selectedMember.name;
        role.textContent = `${translations[currentLanguage].role}: ${getRoleName(selectedMember.role)}`;
        trophies.textContent = `${translations[currentLanguage].trophies}: ${selectedMember.trophies}`;
        leagueName.textContent = `${translations[currentLanguage].leagueName}: ${selectedMember.league.name}`;
        clanBadge.src = clanData.badgeUrls.medium || '';
        const townHall = townHalls.find(th => th.level === selectedMember.townHallLevel);
        townHallImage.src = townHall ? townHall.imageUrl : "";
        profileSection.style.display = "flex";
    } else {
        profileSection.style.display = "none";
    }
}

function handleDropdownChange(e) {
    const selectedTag = e.target.value;
    const selectedMember = clanData.memberList.find(member => member.tag === selectedTag);
    updateProfile(selectedMember);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchMembers();

    const dropdown = document.getElementById("clanMembersDropdown");
    dropdown.addEventListener("change", handleDropdownChange);

    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        toggleLanguage(savedLanguage);
    } else {
        toggleLanguage('en');
    }
});

const townHalls = [
    { level: 1, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/f/fd/Town_Hall1.png" },
    { level: 2, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/7/7d/Town_Hall2.png" },
    { level: 3, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/d/dd/Town_Hall3.png" },
    { level: 4, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/e/e7/Town_Hall4.png" },
    { level: 5, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/a/a3/Town_Hall5.png" },
    { level: 6, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/5/52/Town_Hall6.png" },
    { level: 7, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/7/75/Town_Hall7.png" },
    { level: 8, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/f/fa/Town_Hall8.png" },
    { level: 9, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/e/e0/Town_Hall9.png" },
    { level: 10, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/5/5c/Town_Hall10.png" },
    { level: 11, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/9/96/Town_Hall11.png" },
    { level: 12, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/c/c7/Town_Hall12-1.png" },
    { level: 13, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/9/98/Town_Hall13-1.png" },
    { level: 14, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/e/e0/Town_Hall14-1.png" },
    { level: 15, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/5/5b/Town_Hall15-1.png" },
    { level: 16, imageUrl: "https://static.wikia.nocookie.net/clashofclans/images/5/53/Town_Hall16.png" }
];

const translations = {
    en: {
        selectMember: "Select a Clan Member",
        role: "Role",
        trophies: "Trophies",
        leagueName: "League",
        townHallTitle: "Town Hall",
        roles: ['Elder', 'Co-Leader', 'Leader', 'Member', 'oops'],
        goBack: "Go Back"
    },
    nl: {
        selectMember: "Selecteer een Clan Lid",
        role: "Rol",
        trophies: "Trofeeën",
        leagueName: "Klasse",
        townHallTitle: "Stadhuis",
        roles: ['Oudste', 'Co-Leider', 'Leider', 'Lid', 'oeps'],
        goBack: "Terug"
    }
};

let currentLanguage = 'en';

function toggleLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('preferredLanguage', language);
    document.getElementById('englishBtn').classList.toggle('selected', language === 'en');
    document.getElementById('dutchBtn').classList.toggle('selected', language === 'nl');
    document.getElementById("goBackBtn").textContent = translations[currentLanguage].goBack;

    const lang = translations[currentLanguage];
    document.querySelector('#clanMembersDropdown option').textContent = lang.selectMember;

    const selectedTag = document.getElementById('clanMembersDropdown').value;
    const selectedMember = clanData.memberList.find(member => member.tag === selectedTag);
    updateProfile(selectedMember);

    document.getElementById('role').textContent = `${lang.role}: ${selectedMember ? getRoleName(selectedMember.role) : ''}`;
    document.getElementById('trophies').textContent = `${lang.trophies}: ${selectedMember ? selectedMember.trophies : ''}`;
    document.getElementById('leagueName').textContent = `${lang.leagueName}: ${selectedMember ? selectedMember.league.name : ''}`;
    document.getElementById('townHallTitle').textContent = lang.townHallTitle;
}
document.getElementById('englishBtn').addEventListener('click', () => toggleLanguage('en'));
document.getElementById('dutchBtn').addEventListener('click', () => toggleLanguage('nl'));

toggleLanguage('en');
