
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function TripToEgyptApp() {
  const [places, setPlaces] = useState([
    {
      name: "مطعم فرعوني",
      type: "مطعم",
      lat: 30.0444,
      lng: 31.2357,
      description: "أكل مصري تقليدي بجوار النيل",
    },
    {
      name: "كافيه النخيل",
      type: "كافيه",
      lat: 30.05,
      lng: 31.2333,
      description: "جلسة مريحة ومشروبات مميزة",
    },
    {
      name: "متحف الحضارة",
      type: "مزارات",
      lat: 30.03,
      lng: 31.23,
      description: "رحلة في تاريخ مصر القديم",
    },
  ]);

  const [driverBooking, setDriverBooking] = useState({
    pickupLocation: "مطار القاهرة الدولي",
    dropoffLocation: "فندق الفورسيزونز - الجيزة",
    driverName: "أحمد علي",
    carModel: "تويوتا فورتشنر 2022",
    contact: "+20 100 123 4567",
    time: "10:00 صباحًا، 1 مايو 2025",
  });

  return (
    <main className="bg-[#fefaf1] min-h-screen font-sans">
      <header className="bg-[#1a1a1a] text-yellow-400 p-4 text-center text-xl font-bold">
        TripToEgypt – منصتك الذكية للسياحة في مصر 🇪🇬
      </header>

      <section className="p-4">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">اكتشف الأماكن</h2>
        <div className="h-[400px] rounded-2xl overflow-hidden border shadow">
          <MapContainer
            center={[30.0444, 31.2357]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
            style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {places.map((place, idx) => (
              <Marker key={idx} position={[place.lat, place.lng]}>
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="p-4 mt-6 bg-white border rounded-xl shadow">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">تفاصيل حجز السيارة بالسائق</h2>
        <ul className="text-sm text-[#333] space-y-1">
          <li><strong>نقطة الاستلام:</strong> {driverBooking.pickupLocation}</li>
          <li><strong>نقطة الوصول:</strong> {driverBooking.dropoffLocation}</li>
          <li><strong>اسم السائق:</strong> {driverBooking.driverName}</li>
          <li><strong>موديل السيارة:</strong> {driverBooking.carModel}</li>
          <li><strong>التواصل:</strong> {driverBooking.contact}</li>
          <li><strong>الميعاد:</strong> {driverBooking.time}</li>
        </ul>
      </section>

      <footer className="text-center text-sm text-[#555] p-4">
        © 2025 TripToEgypt – تصميم وتنفيذ عبقري الذكاء الاصطناعي 🤖
      </footer>
    </main>
  );
}
