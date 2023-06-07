import React from 'react';
import Map from './Map';
import { Footer } from './footer';
import { Navbar } from './navbar';
import markerData from './data/usa.json';
import L, { Marker } from 'leaflet';

interface MarkerData {
  lat: number;
  lon: number;
  city: string;
  date: string;
  shows: number;
  openers: [string];
}

const App: React.FC = () => {
  const GAYLE = "./images/gayle.png";
  const PB = "./images/pb.png";
  const paramore = "./images/paramore.png";
  const red = "./images/girl_in_red.png";
  const muna = "./images/muna.png";
  const ga = "./images/gracieAbrams.png";
  const haim = "./images/haim.png";
  const bbdb = "./images/bbdb.png";
  const owenn = "./images/owenn.png";

  const sortedMarkerData = [...markerData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let city_title = "";

  const newMarkers: Marker[] = [];
  sortedMarkerData.forEach((marker, index) => {
    const { city, date } = marker;
    const currentDate = new Date();
    const markerDate = new Date(date);

    if (markerDate >= currentDate) {
      city_title = city;
    }
  });

  return (
    <div style={{ backgroundColor: "#2B324C" }}>
      {/* Header */}
      <Navbar />
      <div className="flex flex-col md:flex-row" style={{}}>
        <div
          className="bg-gray-800 shadow-lg rounded-lg items-center p-10 m-7"
          style={{ width: "75%" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="m-4 text-xl text-white font-semibold flex items-center" style={{ fontFamily: "era" }}>
              <img src="./images/marker-icon.png" width={40} style={{ marginRight: "10px" }} />
              <span>{`Next Tour Location: ${city_title}`}</span>
            </h2>
            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                className="py-1 px-2 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{ fontFamily: "nine", backgroundColor: "#b8acd1" }}
              >
                North American Leg
              </button>
              <button
                className="py-1 px-2 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                style={{ fontFamily: "nine", backgroundColor: "#526d85" }}
              >
                International Dates
              </button>
            </div>

          </div>
          <Map />
          <div style={{ whiteSpace: 'nowrap' }}>
            <img src={GAYLE} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={red} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={muna} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={haim} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={paramore} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={PB} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={ga} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={bbdb} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={owenn} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
          </div>

        </div>

        {/* Start of Legend */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 m-7" style={{ width: "25%" }}>
          {/* <div style={{ whiteSpace: 'nowrap' }}>
            <img src={GAYLE} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin:10 }} />
            <img src={red} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin:10  }} />
            <img src={muna} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin:10  }} />
            <br/>
            <img src={haim} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin:10  }} />
            <img src={paramore} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin:10  }} />
            <img src={PB} style={{ display: 'inline-block', verticalAlign: 'middle',width: 75, margin:10  }} />
          </div> */}

          <img src="./images/eras-tour-poster.png" width={"1000"} alt="tour poster" />

          <h2 className="m-4 text-2xl text-white font-semibold" style={{ fontFamily: "era" }}>
            LEGEND
          </h2>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-white text-2xl" style={{ fontFamily: "folklore" }}>
              Future Locations
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-white text-2xl" style={{ fontFamily: "folklore" }}>
              Completed Locations
            </span>
          </div>
        </div>
        {/* End of Legend */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
