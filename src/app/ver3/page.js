"use client";
import { useEffect, useState } from "react";

// Kiểm tra xem có đang chạy trên trình duyệt hay không
const isBrowser = typeof window !== "undefined";

export default function Ver3() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Đảm bảo rằng thư viện Leaflet đã được load khi chạy trên trình duyệt
    if (isBrowser) {
      import("leaflet").then(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={[10.774, 106.7006]} zoom={8} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
