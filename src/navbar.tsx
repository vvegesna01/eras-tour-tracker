import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className='items-center'>
      <div className="">
        <div className='bg-gray-800 shadow-lg p-5'>
          <a href="/">
            <h1 className="font-semibold text-white text-5xl hover:opacity-75 transition hover:scale-105" style={{ fontFamily: 'era', textAlign: 'center' }}>THE ERAS TOUR TRACKER</h1>
          </a>
          <h1 className="text-white text-2xl" style={{ fontFamily: 'folklore', textAlign: 'center' }}>Click on the map markers to see the dates and openers for each show!</h1>
        </div>
        <div className="absolute top-1 right-0 hover:opacity-75 transition hover:scale-110">
          <a href="https://github.com/vvegesna01">
            <button
              className="rounded-full p-2"
              style={{ width: '90px', height: '40px', border: 'none', outline: 'none' }}
            >
              <img src="./images/github-icon-t.png" alt="GitHub Icon" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
