import React from 'react';
import Map from './Map';
import { Footer } from './footer';
import {Navbar} from './navbar';


const App: React.FC = () => {

  return (
    <div style={{ backgroundColor: "#2B324C" }}>
      {/* Header */}
      <Navbar />

      <div className="flex flex-col md:flex-row" style={{}}>
        <div className="bg-gray-800 shadow-lg rounded-lg items-center p-10 m-7" style={{ width: "75%" }}>
          <Map />
        </div>
        

        {/* Start of Legend */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 m-7" style={{ width: "25%" }}>
          <img src="./images/eras-tour-poster.png"></img>
          <h2 className="m-4 text-2xl text-white font-semibold" style={{fontFamily:"era"}}>legend</h2>
          {/* <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-white">Tour Locations</span>
          </div> */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-white text-2xl" style={{fontFamily:"folklore"}}>Future Locations</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-white text-2xl" style={{fontFamily:"folklore"}}>Completed Locations</span>
          </div>
        </div>


        {/* End of Legend */}
      </div>

      <Footer />
    </div>
  );
};

export default App;
