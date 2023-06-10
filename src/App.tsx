import React, { useEffect, useState } from 'react';
import Map from './Map';
import { Footer } from './footer';
import { Navbar } from './navbar';
import markerData from './data/usa.json';
import L, { Marker } from 'leaflet';
import { PieChart } from 'recharts';
import PieChartComponent from './pieChart';
import SetlistPie from './setlistPie';

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
  const PB = "./images/phoebe-ghost.png";
  const paramore = "./images/paramore-logo.png";
  const red = "./images/girlinredlogo.png";
  const muna = "./images/muna-logo2.png";
  const ga = "./images/gracieAbrams.png";
  const haim = "./images/haim.png";
  const bbdb = "./images/bbdb.png";
  const owenn = "./images/owenn.png";
  const sc = "./images/sc.png";

  const sortedMarkerData = [...markerData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let city_title = "";
  let city_opener: string[] = [];
  let city_date = "";

  const newMarkers: Marker[] = [];
  sortedMarkerData.forEach((marker, index) => {
    const { city, date, openers } = marker;
    const currentDate = new Date();
    const markerDate = new Date(date);

    if (markerDate >= currentDate) {
      city_title = city;
      city_opener = openers;
      city_date = date;
    }
  });

  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = document.getElementById('app-container')?.offsetWidth || 0;
      setContainerWidth(width);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = containerWidth <= 768;

  return (
    <div style={{ backgroundColor: "#2B324C" }} id="app-container">
      {/* Header */}
      <Navbar />
      <div className="grid md:flex md:flex-row">
        <div
          className="bg-gray-800 shadow-lg rounded-lg items-center p-10 m-7"
          style={{ width: isMobile ? "80%" : "75%" }}
        >
          <div className="flex items-center justify-between flex-wrap">
            <h2
              className="text-2xl text-white font-semibold flex items-center animate-slide-in"
              style={{ fontFamily: "era"}}
            >
              <img src="./images/marker-icon.png" width={40} />
              <span>{`Next Show: ${city_title}, ${city_date}`}</span>
              {/* <span>{`Next Tour Date: ${city_date}`}</span> */}
            </h2>
            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                className="py-0.5 px-1 text-white text-sm m-5 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-fade-in"
                style={{ fontFamily: "nine", backgroundColor: "#b8acd1", padding:10 }}
              >
                North American Leg
              </button>
              <button
                className="py-0.5 px-1 text-white text-sm m-5 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 animate-fade-in"
                style={{ fontFamily: "nine", backgroundColor: "#526d85", padding:5 }}
              >
                International Dates
              </button>
            </div>
          </div>
          <Map />
          <div style={{width: isMobile ? "80%" : "75%" }} className="animate-slide-up">
            <img src={GAYLE} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={red} style={{ display: 'inline-block', verticalAlign: 'middle', width: 45, margin: 10 }} />
            <img src={muna} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={haim} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={paramore} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={PB} style={{ padding: 10, display: 'inline-block', verticalAlign: 'middle', width: 40, margin: 10 }} />
            <img src={ga} style={{ display: 'inline-block', verticalAlign: 'middle', width: 100, margin: 10 }} />
            <img src={bbdb} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            <img src={owenn} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} />
            {/* <img src={sc} style={{ display: 'inline-block', verticalAlign: 'middle', width: 75, margin: 10 }} /> */}
          </div>

          <h2
            className="m-4 text-xl text-white font-semibold flex items-center animate-slide-in"
            style={{ fontFamily: "era" }}
          >
            <span>{`Next Openers: ${city_opener}`}</span>
          </h2>
        </div>

        {/* Start of Legend */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 m-7 animate-fade-in" style={{ width: isMobile ? "80%" : "25%" }}>
          <h2 className="m-4 text-lg text-white" style={{ fontFamily: "nine" }}>
            Welcome to the Era's Tour Tracker! International dates and locations will be updated soon ☺
          </h2>
          <img src="./images/eras-tour-poster.png" style={{ width: "100%", boxShadow: "90" }} className="rounded-lg" alt="tour poster" />

          <h2 className="m-3 text-3xl text-white font-semibold" style={{ fontFamily: "era" }}>
            Legend
          </h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-white text-xl" style={{ fontFamily: "folklore" }}>
                Future Locations
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-white text-xl" style={{ fontFamily: "folklore" }}>
                Completed Locations
              </span>
            </div>
          </div>
        </div>
        {/* End of Legend */}
      </div>

      <div className="flex flex-col md:flex-row" style={{}}>

        {/* Surprise Song Analytics */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 m-7 animate-fade-in" style={{ width: isMobile ? "80%" : "90%" }}>
          <h2 className="p-5 text-3xl text-white font-semibold" style={{ fontFamily: "era" }}>
            Surprise Song Analytics
          </h2>
          
          <p className="text-white text-2xl ml-2" style={{ fontFamily: "folklore" }}>
            Click on the components to see how many songs were played for each album :)
          </p>
          
          <PieChartComponent />

          <a
            href="https://www.benlilley.dev/eras-tour-surprise-songs/"
            className="m-4 text-xl text-white underline hover:text-blue"
            style={{ fontFamily: "era" }}
          >
            Surprise Song Tracker Website
          </a>
          <p className="text-white text-lg ml-5 " style={{ fontFamily: "folklore" }}>
            Updated Jun 10, 2023 (Michigan Night 1)
          </p>
          
        </div>

        {/* Setlist Analytics */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 m-7 animate-fade-in" style={{ width: isMobile ? "80%" : "90%" }}>

          <h2 className="p-5 m-3 text-3xl text-white font-semibold" style={{ fontFamily: "era" }}>
            Setlist Songs
          </h2>
          <p className="text-white text-2xl ml-2" style={{ fontFamily: "folklore" }}>1 song on Speak Now is a crime i'm sorry but a 45 song set is a blessing, she's GIVING</p>
          <SetlistPie />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
