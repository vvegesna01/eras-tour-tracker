import React, { useEffect, useState } from 'react';
import L, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from './marker-icon.png'; // Import a custom marker icon if desired
import futureIcon from './future-marker-icon.png';
import completedIcon from './completed-marker-icon.png';

import markerData from './data/na_leg_res.json';

interface MarkerData {
  lat: number;
  lon: number;
  city: string;
  date: string;
  shows: number;
  
}


const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const newMap = L.map('map').setView([37.0902, -95.7129], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      minZoom: 0,
      maxZoom: 15,
    }).addTo(newMap);

    const customIcon = L.icon({
      iconUrl: markerIcon, // Custom marker icon URL
      iconSize: [80, 112], // size of the icon
      iconAnchor: [40, 90], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76],
    });

    const sortedMarkerData = [...markerData].sort(
      (a: MarkerData, b: MarkerData) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    ); // Sort markers by date

    const newMarkers: Marker[] = [];
    sortedMarkerData.forEach((marker, index) => {
      const { lat, lon, city, date, shows} = marker;
      const markerOptions: L.MarkerOptions = {
        icon: customIcon,
      };

      const currentDate = new Date();
      const markerDate = new Date(date);

      if (markerDate <= currentDate) {
        // Completed date
        markerOptions.icon = L.icon({
          ...customIcon.options,
          iconUrl: completedIcon, // Set completed marker icon URL
        });
      } else {
        // Future date
        markerOptions.icon = L.icon({
          ...customIcon.options,
          iconUrl: futureIcon, // Set future marker icon URL
        });
      }

      const mapMarker = new Marker([lat, lon], markerOptions)
        .bindPopup(`<b>${city}</b><br>Date: ${date}<br>Shows: ${shows}`);

      newMarkers.push(mapMarker);
    });

    setMarkers(newMarkers);
    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex >= markers.length) {
          clearInterval(interval);
          return;
        }

        markers[currentIndex].addTo(map);
        currentIndex++;

        // if (currentIndex > 0) {
        //   markers[currentIndex - 1].removeFrom(map);
        // }
      }, 350); // Adjust the interval duration as desired

      return () => {
        clearInterval(interval);
      };
    }
  }, [map, markers]);

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
