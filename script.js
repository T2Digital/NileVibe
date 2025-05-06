// Map Initialization (Mapbox)
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYXR5YTAwIiwiYSI6ImNtYWJxbTFoNDExNXEyanIwa2xxcmJwdWoifQ.0WU0DyTqRl9TjV-Go2O2LA';
let map, markers = [], directions;
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
  { name: "قلعة صلاح الدين", location: [31.2551, 30.0293], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308843", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" }
];

function initMap() {
  const mapContainer = document.getElementById('map-container');
  const fallback = document.getElementById('map-fallback');
  const placesList = document.getElementById('places-list');

  try {
    map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/satellite-v9', // Satellite View
      center: [31.2357, 30.0444],
      zoom: 12
    });

    map.on('load', () => {
      fallback.style.display = 'none';
      placesList.style.display = 'none';
      addMarkers(places);

      // Initialize Directions
      directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        language: 'ar',
        controls: { inputs: false }
      });
      map.addControl(directions, 'top-left');

      const input = document.getElementById('place-picker');
      input.addEventListener('input', (e) => {
        const query = e.target.value;
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&bbox=31.0,29.8,31.5,30.2`)
          .then(response => response.json())
          .then(data => {
            if (data.features.length > 0) {
              const [lng, lat] = data.features[0].center;
              map.flyTo({ center: [lng, lat], zoom: 15 });
              new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
              directions.setDestination([lng, lat]);
              showNotification(`تم اختيار ${data.features[0].place_name}!`, 'success');
            } else {
              showNotification('لم يتم العثور على المكان.', 'error');
            }
          });
      });

      document.getElementById('virtual-tour-btn').addEventListener('click', () => {
        const tourPath = [
          [31.1342, 29.9792], // Pyramids
          [31.2396, 30.0491], // Zooba
          [31.2108, 30.0626], // Cairo Jazz Club
          [31.2336, 30.0481], // Egyptian Museum
          [31.2243, 30.0460]  // Cairo Tower
        ];
        map.fitBounds([tourPath[0], tourPath[tourPath.length - 1]], { padding: 50 });
        let i = 0;
        const tourInterval = setInterval(() => {
          if (i < tourPath.length) {
            map.flyTo({ center: tourPath[i], zoom: 15 });
            if (i > 0) {
              directions.setOrigin(tourPath[i - 1]);
              directions.setDestination(tourPath[i]);
            }
            i++;
          } else {
            clearInterval(tourInterval);
          }
        }, 3000);
        showNotification('بدأت الجولة الافتراضية!', 'success');
      });
    });
  } catch (error) {
    fallback.textContent = `تعذر تحميل الخريطة: ${error.message}. جرب الأماكن أدناه.`;
    console.error('Map Error:', error);
    placesList.style.display = 'block';
    renderPlacesList();
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
  addMarkers(filtered);
  showNotification(`عرض ${type === 'restaurant' ? 'المطاعم' : type === 'cafe' ? 'الكافيهات' : type === 'nightlife' ? 'الديسكوهات' : 'الأماكن السياحية'}!`, 'success');
};

function renderPlacesList() {
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';
  places.forEach(place => {
    const placeItem = document.createElement('div');
    placeItem.className = 'place-item';
    placeItem.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <span>${place.name} (${place.type === "restaurant" ? "مطعم" : place.type === "tourist" ? "سياحي" : place.type === "cafe" ? "كافيه" : "ديسكو"})</span>
    `;
    placeItem.onclick = () => {
      map.flyTo({ center: place.location, zoom: 15 });
      showNotification(`تم اختيار ${place.name}!`, 'success');
    };
    placesList.appendChild(placeItem);
  });
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
        <p>${car.price} جنيه/يوم</p>
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

  // إرسال البيانات لواتساب
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

// Schedule Logic
let scheduleData = [
  { time: "10:00 صباحًا", activity: "استقبال", place: "مطار القاهرة", type: "transport", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { time: "2:00 ظهرًا", activity: "غداء", place: "زووبا", type: "restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
  { time: "8:00 مساءً", activity: "زيارة", place: "الأهرامات", type: "tourist", image: "https://images.unsplash.com/photo-1573051129930-39527d6d8e62" }
];

function renderSchedule() {
  const scheduleDiv = document.getElementById('schedule-list');
  scheduleDiv.innerHTML = '';
  scheduleData.forEach((item, index) => {
    const color = item.type === 'restaurant' ? '#FFD700' : item.type === 'tourist' ? '#FFD700' : item.type === 'cafe' ? '#FFD700' : '#FFD700';
    scheduleDiv.innerHTML += `
      <div class="activity">
        <span>${item.time}: ${item.activity} في ${item.place}</span>
        <div class="icon" style="background: ${color}"></div>
        <img src="${item.image}" alt="${item.place}">
        <button onclick="removeActivity(${index})" style="background: #FFD700; color: #121212; padding: 5px 10px; border-radius: 5px;">حذف</button>
      </div>
    `;
  });
}

window.addActivity = function() {
  const newActivityInput = document.getElementById('new-activity').value;
  if (newActivityInput) {
    const [time, ...rest] = newActivityInput.split(':');
    const activity = rest.join(':').trim();
    const [act, place] = activity.split('في').map(s => s.trim());
    scheduleData.push({
      time: time.trim(),
      activity: act,
      place: place || 'غير محدد',
      type: 'custom',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
    });
    renderSchedule();
    document.getElementById('new-activity').value = '';
    showNotification('تم إضافة النشاط بنجاح!', 'success');
  } else {
    showNotification('يرجى إدخال نشاط صالح.', 'error');
  }
};

window.removeActivity = function(index) {
  scheduleData.splice(index, 1);
  renderSchedule();
  showNotification('تم حذف النشاط بنجاح!', 'success');
};

window.generatePDF = function() {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = doc.pipe(blobStream());

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#121212');
  doc.fontSize(25).fillColor('#FFD700').text('NileVibe Trip Schedule', 50, 50);

  scheduleData.forEach((item, index) => {
    const yPos = 100 + (index * 50);
    doc.fontSize(14)
       .fillColor('#FFFFFF')
       .text(`${item.time}: ${item.activity} في ${item.place}`, 50, yPos);
    doc.fillColor('#FFD700')
       .circle(40, yPos + 5, 5)
       .fill();
  });

  doc.fontSize(10).fillColor('#B0B0B0').text('Powered by NileVibe', 50, doc.page.height - 50);
  doc.end();
  stream.on('finish', () => {
    const url = stream.toBlobURL('application/pdf');
    window.open(url);
  });
};

// Slider Initialization
const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 7000, // زيادة الوقت لإظهار النصوص الديناميكية
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000, // انتقال أكثر سلاسة
});

// Utility Functions
function showNotification(message, type = 'success') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: type === 'success' ? "#FFD700" : "#FF5555",
    className: "notification"
  }).showToast();
}

window.showSection = function(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
  if (sectionId === 'schedule') renderSchedule();
  if (sectionId === 'booking') renderCarGrid();
};

window.openWhatsApp = function() {
  window.open('https://wa.me/+201234567890', '_blank');
};

// Initialize
showSection('home');
initMap();
