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
  { name: "برج القاهرة", location: [31.2243, 30.0460], type: "tourist", color: "#FFD700", url: "https://www.tripadvisor.com/Attraction_Review-g294201-d308846", image: "https://images.unsplash.com/photo-1619687817846-4a497 rim4" },
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
  filte
