import React, { useEffect, useState } from 'react';
import L, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from './marker-icon.png';
import futureIcon from './future-marker-icon.png';
import completedIcon from './completed-marker-icon.png';
import redIcon from './redIcon.png';
import markerData from './data/usa.json';

interface MarkerData {
  lat: number;
  lon: number;
  city: string;
  date: string;
  shows: number;
  openers: [string];
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
      iconUrl: markerIcon,
      iconSize: [60, 60],
      iconAnchor: [30, 50],
      popupAnchor: [-3, -76],
    });

    const sortedMarkerData = [...markerData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const newMarkers: Marker[] = [];
    sortedMarkerData.forEach((marker, index) => {
      const { lat, lon, city, date, shows, openers } = marker;
      const markerOptions: L.MarkerOptions = {
        icon: customIcon,
      };

      const currentDate = new Date();
      const markerDate = new Date(date);

      if (markerDate <= currentDate) {
        markerOptions.icon = L.icon({
          ...customIcon.options,
          iconUrl: completedIcon,
        });

      } else if (markerDate == currentDate) {
        markerOptions.icon = L.icon({
          ...customIcon.options,
          iconUrl: redIcon,
        });

      }
      else {
        markerOptions.icon = L.icon({
          ...customIcon.options,
          iconUrl: futureIcon,
        });
      }

      const GAYLE = "./images/gayle.png";
      const PB = "./images/phoebe-ghost.png";
      const paramore = "./images/paramore-logo.png";
      const red = "./images/girlinredlogo.png";
      const muna = "./images/muna-logo2.png";
      const ga = "./images/gracieAbrams.png";
      const haim = "./images/haim.png";
      const bbdb = "./images/bbdb.png";
      const owenn = "./images/owenn.png";

      const getOpenerIcons = (openers: string[]) => {
        const openerIcons = openers.map((opener, index) => {
          let icon = null;

          switch (opener) {
            case 'GAYLE':
              icon = `<img src=${GAYLE} alt="Gayle" width="90px" style="padding:3px"/>`;
              break;
            case 'girl in red':
              icon = `<img src=${red} alt="girl in red" width="60px" style="padding:3px"/>`;
              break;
            case 'Phoebe Bridgers':
              icon = `<img src=${PB} alt="Phoebe Bridgers" width="40px" style="padding:3px" />`;
              break;
            case 'Paramore':
              icon = `<img src=${paramore} alt="paramore" width="80px" style="padding:3px" />`;
              break;
            case 'MUNA':
              icon = `<img src=${muna} alt="muna" width="80px" style="padding:3px"/>`;
              break;
            case 'Gracie Abrams':
              icon = `<img src=${ga} alt="gracie abrams" width="2000px" style="padding:3px" />`;
              break;
            case 'HAIM':
              icon = `<img src=${haim} alt="haim" width="80px" style="padding:3px"/>`;
              break;
            case 'beabadobee':
              icon = `<img src=${bbdb} alt="bbdb" width="80px"style="padding:3px" />`;
              break;
            case 'OWENN':
              icon = `<img src=${owenn} alt="owenn" width="80px" style="padding:3px"/>`;
              break;
          }

          return icon;
        });

        return openerIcons.join('');
      };

      const openerIcons = getOpenerIcons(openers);
      const mapMarker = new Marker([lat, lon], markerOptions).bindPopup(`
          <div style="background-color: darkred; font-family: nine; color: white; padding: 10px; margin-bottom: 10px;">
        
          <b>${city}</b><br />
          Date: ${date}<br />
          Shows: ${shows}<br />
          ${openerIcons}
        </div>
      `);

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
      }, 350);

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
