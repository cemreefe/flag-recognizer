const canvas = document.getElementById('draw-area');
const ctx = canvas.getContext('2d');
const resultDiv = document.getElementById('result');
const matchBtn = document.getElementById('match-btn');
const palette = document.getElementById('palette');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const brushSizeDisplay = document.getElementById('brush-size-display');
const flagImages = {};

let currentColor = 'black';
let brushSize = 16;
let drawing = false;

const flagNames = [
    "Afghanistan",
    "Greece",
    "Panama",
    "Albania",
    "Greenland",
    "Papua_New_Guinea",
    "Algeria",
    "Grenada",
    "Paraguay",
    "American_Samoa",
    "Guadeloupe",
    "Peru",
    "Andorra",
    "Guam",
    "Philippines",
    "Angola",
    "Guatemala",
    "Pitcairn",
    "Anguilla",
    "Guernsey",
    "Poland",
    "Antarctica",
    "Guinea-Bissau",
    "Portugal",
    "Antigua_and_Barbuda",
    "Guinea",
    "Puerto_Rico",
    "Argentina",
    "Guyana",
    "Qatar",
    "Armenia",
    "Haiti",
    "Romania",
    "Aruba",
    "Heard_Island_and_McDonald_Islands",
    "Russian_Federation",
    "Australia",
    "Holy_See_(Vatican_City_State)",
    "Rwanda",
    "Austria",
    "Honduras",
    "Réunion",
    "Azerbaijan",
    "Hong_Kong",
    "Saint_Barthélemy",
    "Bahamas",
    "Hungary",
    "Saint_Helena,_Ascension_and_Tristan_da_Cunha",
    "Bahrain",
    "Iceland",
    "Saint_Kitts_and_Nevis",
    "Bangladesh",
    "India",
    "Saint_Lucia",
    "Barbados",
    "Indonesia",
    "Saint_Martin_(French_part)",
    "Belarus",
    "Iran,_Islamic_Republic_of",
    "Saint_Pierre_and_Miquelon",
    "Belgium",
    "Iraq",
    "Saint_Vincent_and_the_Grenadines",
    "Belize",
    "Ireland",
    "Samoa",
    "Benin",
    "Isle_of_Man",
    "San_Marino",
    "Bermuda",
    "Israel",
    "Sao_Tome_and_Principe",
    "Bhutan",
    "Italy",
    "Saudi_Arabia",
    "Bolivia,_Plurinational_State_of",
    "Jamaica",
    "Senegal",
    "Bonaire,_Sint_Eustatius_and_Saba",
    "Japan",
    "Serbia",
    "Bosnia_and_Herzegovina",
    "Jersey",
    "Seychelles",
    "Botswana",
    "Jordan",
    "Sierra_Leone",
    "Bouvet_Island",
    "Kazakhstan",
    "Singapore",
    "Brazil",
    "Kenya",
    "Sint_Maarten_(Dutch_part)",
    "British_Indian_Ocean_Territory",
    "Kiribati",
    "Slovakia",
    "Brunei_Darussalam",
    "Korea,_Democratic_People's_Republic_of",
    "Slovenia",
    "Bulgaria",
    "Korea,_Republic_of",
    "Solomon_Islands",
    "Burkina_Faso",
    "Kuwait",
    "Somalia",
    "Burundi",
    "Kyrgyzstan",
    "South_Africa",
    "Cabo_Verde",
    "Lao_People's_Democratic_Republic",
    "South_Georgia_and_the_South_Sandwich_Islands",
    "Cambodia",
    "Latvia",
    "South_Sudan",
    "Cameroon",
    "Lebanon",
    "Spain",
    "Canada",
    "Lesotho",
    "Sri_Lanka",
    "Cayman_Islands",
    "Liberia",
    "Sudan",
    "Central_African_Republic",
    "Libya",
    "Suriname",
    "Chad",
    "Liechtenstein",
    "Svalbard_and_Jan_Mayen",
    "Chile",
    "Lithuania",
    "Sweden",
    "China",
    "Luxembourg",
    "Switzerland",
    "Christmas_Island",
    "Macao",
    "Syrian_Arab_Republic",
    "Cocos_(Keeling)_Islands",
    "Madagascar",
    "Taiwan,_Province_of_China",
    "Colombia",
    "Malawi",
    "Tajikistan",
    "Comoros",
    "Malaysia",
    "Tanzania",
    "Congo,_The_Democratic_Republic_of_the",
    "Maldives",
    "Thailand",
    "Congo",
    "Mali",
    "Timor-Leste",
    "Cook_Islands",
    "Malta",
    "Togo",
    "Costa_Rica",
    "Marshall_Islands",
    "Tokelau",
    "Croatia",
    "Martinique",
    "Tonga",
    "Cuba",
    "Mauritania",
    "Trinidad_and_Tobago",
    "Curaçao",
    "Mauritius",
    "Tunisia",
    "Cyprus",
    "Mayotte",
    "Turkmenistan",
    "Czechia",
    "Mexico",
    "Turks_and_Caicos_Islands",
    "Côte_d'Ivoire",
    "Micronesia,_Federated_States_of",
    "Tuvalu",
    "Denmark",
    "Moldova,_Republic_of",
    "Türkiye",
    "Djibouti",
    "Monaco",
    "Uganda",
    "Dominica",
    "Mongolia",
    "Ukraine",
    "Dominican_Republic",
    "Montenegro",
    "United_Arab_Emirates",
    "Ecuador",
    "Montserrat",
    "United_Kingdom",
    "Egypt",
    "Morocco",
    "United_States",
    "El_Salvador",
    "Mozambique",
    "Uruguay",
    "Equatorial_Guinea",
    "Myanmar",
    "Uzbekistan",
    "Eritrea",
    "Namibia",
    "Vanuatu",
    "Estonia",
    "Nauru",
    "Venezuela",
    "Eswatini",
    "Nepal",
    "Viet_Nam",
    "Ethiopia",
    "Netherlands",
    "Virgin_Islands_British",
    "Falkland_Islands_(Malvinas)",
    "New_Caledonia",
    "Virgin_Islands_U.S.",
    "Faroe_Islands",
    "New_Zealand",
    "Wallis_and_Futuna",
    "Fiji",
    "Nicaragua",
    "Western_Sahara",
    "Finland",
    "Niger",
    "Yemen",
    "France",
    "Nigeria",
    "Zambia",
    "French_Guiana",
    "Niue",
    "Zimbabwe",
    "French_Polynesia",
    "Norfolk_Island",
    "French_Southern_Territories",
    "North_Macedonia",
    "Gabon",
    "Northern_Mariana_Islands",
    "Gambia",
    "Norway",
    "Georgia",
    "Oman",
    "Germany",
    "Pakistan",
    "Ghana",
    "Palau",
    "Åland_Islands"
  ];

brushSizeDisplay.textContent = brushSize;

// Set up color palette
palette.addEventListener('click', (e) => {
  if (e.target.dataset.color) {
    currentColor = e.target.dataset.color;
  }
});

// Brush size controls
increaseBtn.addEventListener('click', () => {
  brushSize = Math.min(brushSize + 2, 50);
  brushSizeDisplay.textContent = brushSize;
});

decreaseBtn.addEventListener('click', () => {
  brushSize = Math.max(1, brushSize - 2);
  brushSizeDisplay.textContent = brushSize;
});

function setResult(result) {
  resultDiv.innerHTML = `<img src="flags/${result}.png" width="160"><br><p>${result}</p>`;
}

// Drawing logic
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);
canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.fillStyle = currentColor;
  ctx.beginPath();
  ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
  ctx.fill();
});

// Matching logic
matchBtn.addEventListener('click', async () => {
  matchBtn.disabled = true;
  const userImageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let bestMatch = '';
  let bestScore = Infinity;
  
  for (let flagName in flagImages) {
    let flag = flagImages[flagName];
    const offscreen = new OffscreenCanvas(canvas.width, canvas.height);
    const offCtx = offscreen.getContext('2d');
    offCtx.drawImage(flag, 0, 0, canvas.width, canvas.height);
    const flagData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    let diff = 0;
    for (let i = 0; i < userImageData.length; i += 4) {
      const dr = userImageData[i] - flagData[i];
      const dg = userImageData[i + 1] - flagData[i + 1];
      const db = userImageData[i + 2] - flagData[i + 2];
      diff += dr * dr + dg * dg + db * db;
    }

    if (diff < bestScore) {
      bestScore = diff;
      bestMatch = flagName;
    }
  }
  setResult(bestMatch)
  matchBtn.disabled = false;
  const drawingDataURL = canvas.toDataURL();
  const url = new URL(window.location.href);
  url.searchParams.set('drawing', drawingDataURL);
  url.searchParams.set('result', bestMatch);
  window.history.replaceState({}, '', url);
});

// Helper to load image as HTMLImageElement
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.src = src;
  });
}

const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const drawing = params.get('drawing');
  const result = params.get('result');

  if (drawing) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.src = drawing;
    document.querySelectorAll('meta[property=og\\:image]')[0].setAttribute('content', 'drawing');
  }

  if (result) {
    setResult(result);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  for (const [index, name] of flagNames.entries()) {
    searchProgressBar.setAttribute("value", index);
    const flag = await loadImage(`flags/${name}.png`);
    flagImages[name] = flag;
  }
});
