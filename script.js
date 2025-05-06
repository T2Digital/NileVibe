// Map Initialization (Mapbox)
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYXR5YTAwIiwiYSI6ImNtYWJxbTFoNDExNXEyanIwa2xxcmJwdWoifQ.0WU0DyTqRl9TjV-Go2O2LA';
let map, markers = [];
const places = [
  { name: "زووبا", location: [31.2396, 30.0491], type: "restaurant", color: "#FFD700", url: "https://zoobaeats.com", menu: "zooba_menu.pdf", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
  { name: "الأهرامات", location: [31.1342, 29.9792], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294202-d308847", image: "https://images.unsplash.com/photo-1573051129930-39527d6d8e62" },
  { name: "Cairo Jazz Club", location: [31.2108, 30.0626], type: "nightlife", color: "#FFD700", url: "https://cairojazzclub.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "قهوة", location: [31.2431, 30.0512], type: "cafe", color: "#FFD700", url: "https://qahwa.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "كشري أبو طارق", location: [31.2400, 30.0510], type: "restaurant", color: "#FFD700", url: "https://abutarek.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "خان الخليلي", location: [31.2622, 30.0478], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308844", image: "https://images.unsplash.com/photo-1602774897447-16c7273db418" },
  { name: "المتحف المصري", location: [31.2336, 30.0481], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308838", image: "https://images.unsplash.com/photo-1591117207239-99a08b78ebb7" },
  { name: "برج القاهرة", location: [31.2243, 30.0460], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308846", image: "https://images.unsplash.com/photo-1619687817846-4a497 rim4" },
  { name: "حديقة الأزهر", location: [31.2630, 30.0571], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308845", image: "https://images.unsplash.com/photo-1589301066999-4a0b3d9c4d9b" },
  { name: "قلعة صلاح الدين", location: [31.2551, 30.0293], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308843", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "تبولة", location: [31.2425, 30.0505], type: "restaurant", color: "#FFD700", url: "https://taboula.com", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "فلفلة", location: [31.2380, 30.0520], type: "restaurant", color: "#FFD700", url: "https://felfela.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "نعمة", location: [31.2410, 30.0490], type: "restaurant", color: "#FFD700", url: "https://na3ma.com", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "سوق العصر", location: [31.2375, 30.0515], type: "restaurant", color: "#FFD700", url: "https://soqal3asr.com", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "قهوة الفيشاوي", location: [31.2600, 30.0475], type: "cafe", color: "#FFD700", url: "https://elfishawy.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "كوستا", location: [31.2450, 30.0530], type: "cafe", color: "#FFD700", url: "https://costa.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "سيموندس", location: [31.2405, 30.0500], type: "cafe", color: "#FFD700", url: "https://simonds.com", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
  { name: "The Tap", location: [31.2150, 30.0600], type: "nightlife", color: "#FFD700", url: "https://thetap.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "Stage One", location: [31.2200, 30.0580], type: "nightlife", color: "#FFD700", url: "https://stageone.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" },
  { name: "Gu Bar", location: [31.2250, 30.0550], type: "nightlife", color: "#FFD700", url: "https://gubar.com", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819" }
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
        // Define tour path with place names
        const tourPath = [
          { location: [31.1342, 29.9792], name: "الأهرامات" },
          { location: [31.2396, 30.0491], name: "زووبا" },
          { location: [31.2108, 30.0626], name: "Cairo Jazz Club" },
          { location: [31.2336, 30.0481], name: "المتحف المصري" },
          { location: [31.2243, 30.0460], name: "برج القاهرة" },
          { location: [31.2425, 30.0505], name: "تبولة" }
        ];
        let i = 0;
        showNotification('بدأت الجولة الافتراضية!', 'success');
        const tourInterval = setInterval(() => {
          if (i < tourPath.length) {
            map.flyTo({ center: tourPath[i].location, zoom: 15 });
            // Show place name in a notification
            showNotification(`الآن في: ${tourPath[i].name}`, 'info');
            i++;
          } else {
            clearInterval(tourInterval);
            showNotification('انتهت الجولة الافتراضية!', 'success');
          }
        }, 3000);
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
          <span>${place.type === "restaurant" ? "مطعم" : place.type === "tourist" ? "مكان سياحي" : place.type === "cafe" ? "كافيه" : "حياة ليلية"}</span><br>
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
  showNotification(`عرض ${type === 'restaurant' ? 'المطاعم' : type === 'cafe' ? 'الكافيهات' : type === 'nightlife' ? 'الديسكوهات' : 'الأماكن السياحية'}!`, 'success');
};

function renderPlacesList(filteredPlaces) {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';
  filteredPlaces.forEach(place => {
    const placeItem = document.createElement('div');
    placeItem.className = 'place-item';
    placeItem.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <span>${place.name} (${place.type === "restaurant" ? "مطعم" : place.type === "tourist" ? "سياحي" : place.type === "cafe" ? "كافيه" : "ديسكو"})</span>
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

function renderScheduleTable() {
  const table = document.getElementById('schedule-table');
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

  // Header
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>اليوم</th>
    <th>الصباح</th>
    <th>الظهر</th>
    <th>المساء</th>
  `;
  table.appendChild(headerRow);

  // Rows
  days.forEach(day => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${day.name}</td>
      <td>
        <select onchange="updateCalendar('${day.key}', 'morning', this.value)">
          <option value="">اختر مكانًا</option>
          ${places.map(p => `<option value="${p.name}" ${calendarData[day.key].morning === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
        </select>
      </td>
      <td>
        <select onchange="updateCalendar('${day.key}', 'afternoon', this.value)">
          <option value="">اختر مكانًا</option>
          ${places.map(p => `<option value="${p.name}" ${calendarData[day.key].afternoon === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
        </select>
      </td>
      <td>
        <select onchange="updateCalendar('${day.key}', 'evening', this.value)">
          <option value="">اختر مكانًا</option>
          ${places.map(p => `<option value="${p.name}" ${calendarData[day.key].evening === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
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
  localStorage.setItem('calendarData', JSON.stringify(calendarData));
  showNotification('تم حفظ الجدول بنجاح!', 'success');
};

window.generatePDF = function() {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = doc.pipe(blobStream());

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#121212');
  doc.fontSize(25).fillColor('#FFD700').text('NileVibe Weekly Schedule', 50, 50);

  let yPos = 100;
  Object.keys(calendarData).forEach((day, index) => {
    const dayName = {
      saturday: 'السبت',
      sunday: 'الأحد',
      monday: 'الإثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة'
    }[day];
    doc.fontSize(16).fillColor('#FFD700').text(dayName, 50, yPos);
    yPos += 20;
    if (calendarData[day].morning) {
      doc.fontSize(12).fillColor('#FFFFFF').text(`الصباح: ${calendarData[day].morning}`, 60, yPos);
      yPos += 15;
    }
    if (calendarData[day].afternoon) {
      doc.fontSize(12).fillColor('#FFFFFF').text(`الظهر: ${calendarData[day].afternoon}`, 60, yPos);
      yPos += 15;
    }
    if (calendarData[day].evening) {
      doc.fontSize(12).fillColor('#FFFFFF').text(`المساء: ${calendarData[day].evening}`, 60, yPos);
      yPos += 15;
    }
    yPos += 10;
  });

  doc.fontSize(10).fillColor('#B0B0B0').text('Powered by NileVibe', 50, doc.page.height - 50);
  doc.end();
  stream.on('finish', () => {
    const url = stream.toBlobURL('application/pdf');
    window.open(url);
  });
};

// Utility Functions
function showNotification(message, type = 'success') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: type === 'success' ? "#FFD700" : type === 'error' ? "#FF5555" : "#FFEA00",
    className: "notification"
  }).showToast();
}

window.scrollToSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
  if (sectionId === 'schedule') renderScheduleTable();
  if (sectionId === 'booking') renderCarGrid();
};

window.openWhatsApp = function() {
  window.open('https://wa.me/+201125845757', '_blank');
};

// Initialize
initMap();
renderScheduleTable();
renderCarGrid();
