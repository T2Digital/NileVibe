// Map Initialization (Mapbox)
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYXR5YTAwIiwiYSI6ImNtYWJxbTFoNDExNXEyanIwa2xxcmJwdWoifQ.0WU0DyTqRl9TjV-Go2O2LA';
let map, markers = [];
const places = [
  // Restaurants (Green: #00FF00)
  { name: "زووبا", location: [31.2396, 30.0491], type: "restaurant", color: "#00FF00", url: "https://zoobaeats.com", menu: "zooba_menu.pdf", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
  { name: "كشري أبو طارق", location: [31.2400, 30.0510], type: "restaurant", color: "#00FF00", url: "https://abutarek.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "تبولة", location: [31.2425, 30.0505], type: "restaurant", color: "#00FF00", url: "https://taboula.com", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "فلفلة", location: [31.2380, 30.0520], type: "restaurant", color: "#00FF00", url: "https://felfela.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "نعمة", location: [31.2410, 30.0490], type: "restaurant", color: "#00FF00", url: "https://na3ma.com", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "سوق العصر", location: [31.2375, 30.0515], type: "restaurant", color: "#00FF00", url: "https://soqal3asr.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "بليند", location: [31.2415, 30.0500], type: "restaurant", color: "#00FF00", url: "https://blend.com", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
  { name: "حجوجه", location: [31.2420, 30.0495], type: "restaurant", color: "#00FF00", url: "https://hajouja.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "ظاظا", location: [31.2405, 30.0515], type: "restaurant", color: "#00FF00", url: "https://zaza.com", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "صبحي كابر", location: [31.2390, 30.0505], type: "restaurant", color: "#00FF00", url: "https://sobhykaber.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "فرحات", location: [31.2385, 30.0525], type: "restaurant", color: "#00FF00", url: "https://farahat.com", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "السدة", location: [31.2410, 30.0530], type: "restaurant", color: "#00FF00", url: "https://alsada.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  // Cafes (Orange: #FFA500)
  { name: "قهوة", location: [31.2431, 30.0512], type: "cafe", color: "#FFA500", url: "https://qahwa.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "قهوة الفيشاوي", location: [31.2600, 30.0475], type: "cafe", color: "#FFA500", url: "https://elfishawy.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "كوستا", location: [31.2450, 30.0530], type: "cafe", color: "#FFA500", url: "https://costa.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "سيموندس", location: [31.2405, 30.0500], type: "cafe", color: "#FFA500", url: "https://simonds.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "بيت ورد", location: [31.2420, 30.0520], type: "cafe", color: "#FFA500", url: "https://beitward.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "فيولا", location: [31.2415, 30.0510], type: "cafe", color: "#FFA500", url: "https://viola.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "ذا روف", location: [31.2430, 30.0505], type: "cafe", color: "#FFA500", url: "https://theroof.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  // Nightlife (Red: #FF0000)
  { name: "Cairo Jazz Club", location: [31.2108, 30.0626], type: "nightlife", color: "#FF0000", url: "https://cairojazzclub.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "The Tap", location: [31.2150, 30.0600], type: "nightlife", color: "#FF0000", url: "https://thetap.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "Stage One", location: [31.2200, 30.0580], type: "nightlife", color: "#FF0000", url: "https://stageone.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "Gu Bar", location: [31.2250, 30.0550], type: "nightlife", color: "#FF0000", url: "https://gubar.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "سبين", location: [31.2120, 30.0610], type: "nightlife", color: "#FF0000", url: "https://spin.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "إيكو", location: [31.2130, 30.0605], type: "nightlife", color: "#FF0000", url: "https://eco.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "توباز", location: [31.2140, 30.0595], type: "nightlife", color: "#FF0000", url: "https://topaz.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "كاش", location: [31.2155, 30.0585], type: "nightlife", color: "#FF0000", url: "https://cash.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "فوكس", location: [31.2160, 30.0575], type: "nightlife", color: "#FF0000", url: "https://fox.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "كوزمو", location: [31.2170, 30.0565], type: "nightlife", color: "#FF0000", url: "https://cosmo.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "ستديج", location: [31.2180, 30.0555], type: "nightlife", color: "#FF0000", url: "https://stage.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "أوبال", location: [31.2190, 30.0545], type: "nightlife", color: "#FF0000", url: "https://opal.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "إكس أو", location: [31.2200, 30.0535], type: "nightlife", color: "#FF0000", url: "https://xo.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "كاي", location: [31.2210, 30.0525], type: "nightlife", color: "#FF0000", url: "https://kai.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "أوفيد", location: [31.2220, 30.0515], type: "nightlife", color: "#FF0000", url: "https://ofid.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "جراود شيراتون", location: [31.2230, 30.0505], type: "nightlife", color: "#FF0000", url: "https://crowdsheraton.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  // Tourist (Gold: #FFD700)
  { name: "الأهرامات", location: [31.1342, 29.9792], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294202-d308847", image: "https://images.unsplash.com/photo-1573051129930-39527d6d8e62" },
  { name: "خان الخليلي", location: [31.2622, 30.0478], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308844", image: "https://images.unsplash.com/photo-1602774897447-16c7273db418" },
  { name: "المتحف المصري", location: [31.2336, 30.0481], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308838", image: "https://images.unsplash.com/photo-1591117207239-99a08b78ebb7" },
  { name: "برج القاهرة", location: [31.2243, 30.0460], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308846", image: "https://images.unsplash.com/photo-1619687817846-4a497rim4" },
  { name: "حديقة الأزهر", location: [31.2630, 30.0571], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308845", image: "https://images.unsplash.com/photo-1589301066999-4a0b3d9c4d9b" },
  { name: "قلعة صلاح الدين", location: [31.2551, 30.0293], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308843", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "المتحف المصري الكبير", location: [31.1330, 29.9780], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308850", image: "https://images.unsplash.com/photo-1591117207239-99a08b78ebb7" },
  { name: "متحف الحضارة", location: [31.1310, 30.0600], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308851", image: "https://images.unsplash.com/photo-1591117207239-99a08b78ebb7" },
  // Lounge (Purple: #800080)
  { name: "كازان", location: [31.2400, 30.0540], type: "lounge", color: "#800080", url: "https://kazan.com", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b" },
  { name: "ذا لندن", location: [31.2410, 30.0535], type: "lounge", color: "#800080", url: "https://thelondon.com", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b" },
  { name: "ليمون تري", location: [31.2420, 30.0530], type: "lounge", color: "#800080", url: "https://lemontree.com", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b" },
  { name: "ماكسيم", location: [31.2430, 30.0525], type: "lounge", color: "#800080", url: "https://maxim.com", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b" },
  // Nile Cruise (Blue: #0000FF)
  { name: "يخت النيل", location: [31.2300, 30.0450], type: "nile_cruise", color: "#0000FF", url: "https://nileyacht.com", image: "https://images.unsplash.com/photo-1516426122075-c23e6d15a7f2" },
  { name: "يخت القناطر الخيرية", location: [31.2290, 30.0460], type: "nile_cruise", color: "#0000FF", url: "https://qanateryacht.com", image: "https://images.unsplash.com/photo-1516426122075-c23e6d15a7f2" }
];

function initMap() {
  const mapContainer = document.getElementById('map-container');
  const fallback = document.getElementById('map-fallback');
  const placesList = document.getElementById('places-list');

  try {
    map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [31.2357, 30.0444],
      zoom: 12
    });

    map.on('load', () => {
      fallback.style.display = 'none';
      renderPlacesList(places);

      const input = document.getElementById('place-picker');
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = places.filter(p => p.name.toLowerCase().includes(query));
        renderPlacesList(filtered);
      });

      document.getElementById('virtual-tour-btn').addEventListener('click', () => {
        const tourPlaces = [
          { location: [31.1342, 29.9792], name: "الأهرامات" },
          { location: [31.2396, 30.0491], name: "زووبا" },
          { location: [31.2108, 30.0626], name: "Cairo Jazz Club" },
          { location: [31.2336, 30.0481], name: "المتحف المصري" },
          { location: [31.2243, 30.0460], name: "برج القاهرة" },
          { location: [31.2425, 30.0505], name: "تبولة" },
          { location: [31.2300, 30.0450], name: "يخت النيل" }
        ];
        const label = document.getElementById('virtual-tour-label');
        let i = 0;
        label.style.display = 'block';
        const tourInterval = setInterval(() => {
          if (i < tourPlaces.length) {
            map.flyTo({ center: tourPlaces[i].location, zoom: 15 });
            label.textContent = tourPlaces[i].name;
            i++;
          } else {
            clearInterval(tourInterval);
            label.style.display = 'none';
          }
        }, 3000);
        showNotification('بدأت الجولة الافتراضية!', 'success');
      });
    });
  } catch (error) {
    fallback.textContent = `تعذر تحميل الخريطة: ${error.message}. جرب الأماكن أدناه.`;
    console.error('Map Error:', error);
    placesList.style.display = 'block';
    renderPlacesList(places);
  }
}

function addMarkers(filteredPlaces) {
  markers.forEach(m => m.remove());
  markers = [];
  filteredPlaces.forEach(place => {
    const marker = new mapboxgl.Marker({ color: place.color })
      .setLngLat(place.location)
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div style="font-family: Montserrat; text-align: right; color: #121212; max-width: 200px;">
          <img src="${place.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
          <strong>${place.name}</strong><br>
          <span>${place.type === "restaurant" ? "مطعم" : place.type === "tourist" ? "مكان سياحي" : place.type === "cafe" ? "كافيه" : place.type === "nightlife" ? "سهرات" : place.type === "lounge" ? "لاونج" : "رحلة نيلية"}</span><br>
          ${place.menu ? `<a href="${place.menu}" target="_blank">المنيو</a><br>` : ''}
          <a href="${place.url || '#'}" target="_blank">التفاصيل</a>
        </div>
      `))
      .addTo(map);
    markers.push(marker);
  });
}

window.filterPlaces = function(type) {
  const filtered = type ? places.filter(p => p.type === type) : places;
  renderPlacesList(filtered);
  addMarkers(filtered);
  showNotification(`عرض ${type === 'restaurant' ? 'المطاعم' : type === 'cafe' ? 'الكافيهات' : type === 'nightlife' ? 'السهرات' : type === 'lounge' ? 'اللاونج' : type === 'tourist' ? 'الأماكن السياحية' : 'رحلات نيلية'}!`, 'success');
};

function renderPlacesList(filteredPlaces) {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';
  filteredPlaces.forEach(place => {
    const placeItem = document.createElement('div');
    placeItem.className = 'place-item';
    placeItem.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <span>${place.name} (${place.type === "restaurant" ? "مطعم" : place.type === "tourist" ? "سياحي" : place.type === "cafe" ? "كافيه" : place.type === "nightlife" ? "سهرات" : place.type === "lounge" ? "لاونج" : "رحلة نيلية"})</span>
    `;
    placeItem.onclick = () => {
      map.flyTo({ center: place.location, zoom: 15 });
      markers.forEach(m => {
        if (m._lngLat.lng === place.location[0] && m._lngLat.lat === place.location[1]) {
          m.togglePopup();
        }
      });
      showNotification(`تم اختيار ${place.name}!`, 'success');
    };
    placesList.appendChild(placeItem);
  });
  addMarkers(filteredPlaces);
}

// Booking Logic
const cars = {
  economy: [
    { name: "Nissan Sentra", price: 450, details: "4 ركاب، اقتصادية", image: "https://images.unsplash.com/photo-1588636142475-a62d56692870" },
    { name: "Kia Cerato", price: 500, details: "4 ركاب، مريحة", image: "https://images.unsplash.com/photo-1618843473801-9f7a78c3b3b8" },
    { name: "Hyundai Elantra", price: 480, details: "4 ركاب، موفرة", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { name: "Toyota Corolla", price: 470, details: "4 ركاب، متينة", image: "https://images.unsplash.com/photo-1592805723127-0a2c4d4e9d62" },
    { name: "Mitsubishi Lancer", price: 460, details: "4 ركاب، شبابية", image: "https://images.unsplash.com/photo-1605557626697-2b86e8f8319a" }
  ],
  luxury: [
    { name: "Mercedes C-Class", price: 2000, details: "5 ركاب، فخمة", image: "https://images.unsplash.com/photo-1606220838315-7b6b3e3d4f39" },
    { name: "BMW 3 Series", price: 2200, details: "5 ركاب، رياضية", image: "https://images.unsplash.com/photo-1607141815636-15eafc9e6b08" },
    { name: "Audi A4", price: 2100, details: "5 ركاب، تكنولوجيا متقدمة", image: "https://images.unsplash.com/photo-1605557626697-2b86e8f8319a" },
    { name: "Volvo S60", price: 2300, details: "5 ركاب، أمان عالي", image: "https://images.unsplash.com/photo-1605557626697-2b86e8f8319a" },
    { name: "Range Rover", price: 3500, details: "5 ركاب، فاخرة جدًا", image: "https://images.unsplash.com/photo-1605557626697-2b86e8f8319a" }
  ]
};

let selectedCar = null;

function renderCarGrid() {
  const carGrid = document.getElementById('car-grid');
  carGrid.innerHTML = '';
  Object.keys(cars).forEach(type => {
    cars[type].forEach(car => {
      const carCard = document.createElement('div');
      carCard.className = 'car-card';
      carCard.innerHTML = `
        <img src="${car.image}" alt="${car.name}">
        <h4>${car.name}</h4>
        <p>${car.details}</p>
        <p class="price">${car.price} جنيه/يوم</p>
      `;
      carCard.onclick = () => {
        selectedCar = car;
        document.querySelectorAll('.car-card').forEach(c => c.classList.remove('selected'));
        carCard.classList.add('selected');
        calculateTotalPrice();
      };
      carGrid.appendChild(carCard);
    });
  });
}

function calculateTotalPrice() {
  if (!selectedCar) return;
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);
  if (startDate && endDate && endDate >= startDate) {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = selectedCar.price * days;
    document.getElementById('total-price').textContent = `السعر الإجمالي: ${totalPrice.toFixed(2)} جنيه (لمدة ${days} يوم)`;
  } else {
    document.getElementById('total-price').textContent = 'السعر الإجمالي: 0 جنيه';
  }
}

document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!selectedCar) {
    showNotification('يرجى اختيار سيارة أولاً.', 'error');
    return;
  }
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;

  const bookingData = {
    car: selectedCar.name,
    start_date: document.getElementById('start-date').value,
    end_date: document.getElementById('end-date').value,
    arrival_time: document.getElementById('arrival-time').value,
    departure_time: document.getElementById('departure-time').value,
    pickup_location: document.getElementById('pickup-location').value,
    dropoff_location: document.getElementById('dropoff-location').value,
    trip_duration: days,
    total_price: document.getElementById('total-price').textContent.match(/[\d.]+/)[0]
  };

  const whatsappMessage = `
حجز جديد من NileVibe:
السيارة: ${bookingData.car}
تاريخ الوصول: ${bookingData.start_date}
تاريخ المغادرة: ${bookingData.end_date}
وقت الوصول: ${bookingData.arrival_time}
وقت المغادرة: ${bookingData.departure_time}
موقع الاستلام: ${bookingData.pickup_location}
موقع التسليم: ${bookingData.dropoff_location}
مدة الرحلة: ${bookingData.trip_duration} يوم
السعر الإجمالي: ${bookingData.total_price} جنيه
ملاحظة: يتم دفع المبلغ بالكامل بمجرد الاستلام
  `.trim();
  const whatsappUrl = `https://wa.me/+201234567890?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, '_blank');

  showNotification('تم إرسال الحجز إلى واتساب!', 'success');
  document.getElementById('booking-form').reset();
  document.getElementById('total-price').textContent = 'السعر الإجمالي: 0 جنيه';
  selectedCar = null;
  document.querySelectorAll('.car-card').forEach(c => c.classList.remove('selected'));
});

document.getElementById('start-date').addEventListener('change', calculateTotalPrice);
document.getElementById('end-date').addEventListener('change', calculateTotalPrice);

// Schedule Table Logic
let calendarData = {
  saturday: { morning: '', afternoon: '', evening: '' },
  sunday: { morning: '', afternoon: '', evening: '' },
  monday: { morning: '', afternoon: '', evening: '' },
  tuesday: { morning: '', afternoon: '', evening: '' },
  wednesday: { morning: '', afternoon: '', evening: '' },
  thursday: { morning: '', afternoon: '', evening: '' },
  friday: { morning: '', afternoon: '', evening: '' }
};

// Load saved calendar data
function loadCalendarData() {
  const savedData = localStorage.getItem('calendarData');
  if (savedData) {
    calendarData = JSON.parse(savedData);
  }
}

function renderScheduleTable() {
  const table = document.getElementById('schedule-table');
  const suggestion = document.getElementById('schedule-suggestion');
  table.innerHTML = '';
  const days = [
    { name: 'السبت', key: 'saturday' },
    { name: 'الأحد', key: 'sunday' },
    { name: 'الإثنين', key: 'monday' },
    { name: 'الثلاثاء', key: 'tuesday' },
    { name: 'الأربعاء', key: 'wednesday' },
    { name: 'الخميس', key: 'thursday' },
    { name: 'الجمعة', key: 'friday' }
  ];

  // Suggestions
  const randomPlaces = places.sort(() => 0.5 - Math.random()).slice(0, 5);
  suggestion.innerHTML = `اقتراحات لرحلتك: ${randomPlaces.map(p => `<a href="${p.url}" target="_blank">${p.name}</a>`).join('، ')}. اكتشف المزيد أدناه!`;

  // Header
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>اليوم</th>
    <th>الصباح</th>
    <th>الظهر</th>
    <th>المساء</th>
  `;
  table.appendChild(headerRow);

  // Group places by type
  const groupedPlaces = {
    restaurant: places.filter(p => p.type === 'restaurant'),
    cafe: places.filter(p => p.type === 'cafe'),
    nightlife: places.filter(p => p.type === 'nightlife'),
    lounge: places.filter(p => p.type === 'lounge'),
    tourist: places.filter(p => p.type === 'tourist'),
    nile_cruise: places.filter(p => p.type === 'nile_cruise')
  };

  // Rows
  days.forEach(day => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${day.name}</td>
      <td>
        <select onchange="updateCalendar('${day.key}', 'morning', this.value)">
          <option value="">اختر مكانًا</option>
          <optgroup label="مطاعم">
            ${groupedPlaces.restaurant.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="كافيهات">
            ${groupedPlaces.cafe.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="سهرات">
            ${groupedPlaces.nightlife.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="لاونج">
            ${groupedPlaces.lounge.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="سياحية">
            ${groupedPlaces.tourist.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="رحلات نيلية">
            ${groupedPlaces.nile_cruise.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
        </select>
      </td>
      <td>
        <select onchange="updateCalendar('${day.key}', 'afternoon', this.value)">
          <option value="">اختر مكانًا</option>
          <optgroup label="مطاعم">
            ${groupedPlaces.restaurant.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="كافيهات">
            ${groupedPlaces.cafe.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="سهرات">
            ${groupedPlaces.nightlife.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="لاونج">
            ${groupedPlaces.lounge.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="سياحية">
            ${groupedPlaces.tourist.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="رحلات نيلية">
            ${groupedPlaces.nile_cruise.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
        </select>
      </td>
      <td>
        <select onchange="updateCalendar('${day.key}', 'evening', this.value)">
          <option value="">اختر مكانًا</option>
          <optgroup label="مطاعم">
            ${groupedPlaces.restaurant.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="كافيهات">
            ${groupedPlaces.cafe.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="سهرات">
            ${groupedPlaces.nightlife.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="لاونج">
            ${groupedPlaces.lounge.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="سياحية">
            ${groupedPlaces.tourist.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
          <optgroup label="رحلات نيلية">
            ${groupedPlaces.nile_cruise.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </optgroup>
        </select>
      </td>
    `;
    table.appendChild(row);
  });
}

window.updateCalendar = function(day, slot, value) {
  calendarData[day][slot] = value;
  showNotification(`تم تحديث ${slot === 'morning' ? 'الصباح' : slot === 'afternoon' ? 'الظهر' : 'المساء'} ليوم ${day}!`, 'success');
};

window.saveCalendar = function() {
  try {
    localStorage.setItem('calendarData', JSON.stringify(calendarData));
    showNotification('تم حفظ البرنامج بنجاح! سيظهر الجدول المحفوظ عند إعادة تحميل الصفحة.', 'success');
  } catch (error) {
    showNotification('فشل في حفظ البرنامج. تأكد من إعدادات التخزين.', 'error');
    console.error('Save Calendar Error:', error);
  }
};

// Placeholder logo (Base64) - Commented out due to corruption
// const placeholderLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

window.generatePDF = function() {
  try {
    // Check if jsPDF is loaded
    if (!window.jspdf) {
      throw new Error('jsPDF library is not loaded. Please check your network or try again later.');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    // Background
    doc.setFillColor(18, 18, 18); // #121212
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // Logo Placeholder (Text instead of image)
    // doc.addImage(placeholderLogo, 'PNG', 50, 30, 50, 50); // Commented out due to corrupt PNG
    doc.setFontSize(12);
    doc.setTextColor(255, 215, 0); // #FFD700
    doc.setFont('helvetica', 'bold');
    doc.text('NileVibe Logo', 50, 50);

    // Title
    doc.setFontSize(25);
    doc.setTextColor(255, 215, 0); // #FFD700
    doc.setFont('helvetica', 'bold');
    doc.text('NileVibe Weekly Schedule', 110, 50);

    // Table Header
    let yPos = 100;
    doc.setFontSize(16);
    doc.text('الجدول الأسبوعي', 50, yPos);
    yPos += 20;
    doc.setFillColor(255, 215, 0); // #FFD700
    doc.rect(50, yPos, 510, 30, 'F');
    doc.setFontSize(12);
    doc.setTextColor(18, 18, 18); // #121212
    doc.text('اليوم', 50, yPos + 20);
    doc.text('الصباح', 200, yPos + 20);
    doc.text('الظهر', 350, yPos + 20);
    doc.text('المساء', 500, yPos + 20);
    yPos += 30;

    // Table Rows
    const days = {
      saturday: 'السبت',
      sunday: 'الأحد',
      monday: 'الإثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة'
    };
    Object.keys(calendarData).forEach((day) => {
      doc.setFillColor(26, 26, 26); // #1A1A1A
      doc.rect(50, yPos, 510, 30, 'F');
      doc.setDrawColor(255, 215, 0); // #FFD700
      doc.rect(50, yPos, 510, 30);
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // #FFFFFF
      doc.text(days[day], 50, yPos + 20);
      doc.text(calendarData[day].morning || '-', 200, yPos + 20);
      doc.text(calendarData[day].afternoon || '-', 350, yPos + 20);
      doc.text(calendarData[day].evening || '-', 500, yPos + 20);
      yPos += 30;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(176, 176, 176); // #B0B0B0
    doc.text('Powered by NileVibe', 50, doc.internal.pageSize.height - 50);

    // Save PDF
    const pdfOutput = doc.output('blob');
    const url = URL.createObjectURL(pdfOutput);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NileVibe_Schedule.pdf';
    link.click();
    showNotification(`تم تحميل البرنامج كـ PDF! <a href="${url}" target="_blank">افتح الملف</a>`, 'success', 5000);
    setTimeout(() => URL.revokeObjectURL(url), 60000); // Clean up after 60 seconds
  } catch (error) {
    showNotification(`فشل في تحميل الـ PDF: ${error.message}. حاول إعادة تحميل الصفحة أو تحقق من الاتصال بالإنترنت.`, 'error');
    console.error('PDF Generation Error:', error);
  }
};

// Utility Functions
function showNotification(message, type = 'success', duration = 3000) {
  Toastify({
    text: message,
    duration: duration,
    gravity: "bottom",
    position: "right",
    backgroundColor: type === 'success' ? "#FFD700" : "#FF5555",
    className: "notification",
    escapeMarkup: false // Allow HTML in notification
  }).showToast();
}

window.scrollToSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
  if (sectionId === 'schedule') {
    loadCalendarData();
    renderScheduleTable();
  }
  if (sectionId === 'booking') renderCarGrid();
};

window.openWhatsApp = function() {
  window.open('https://wa.me/+201234567890', '_blank');
};

// Initialize
initMap();
loadCalendarData();
renderScheduleTable();
renderCarGrid();
