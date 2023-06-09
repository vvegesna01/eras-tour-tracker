import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import data from "./data/surprise_songs.json";

const PieChartComponent: React.FC = () => {
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const handlePieClick = (data: any, index: number) => {
    setActiveSlice(index);
  };

  const renderLabel = (entry: any) => {
    const { album, songs } = entry;

    if (entry.index === activeSlice) {
      return `${songs} Songs`;
    }

    return album;
  };

  return (
    <div className="pie-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="songs"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="black"
            label={renderLabel}
            onClick={handlePieClick}
            fontFamily="nine"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* <style>{`
        .pie-chart-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .pie-chart-container {
            max-width: none;
          }
        }
      `}</style> */}
    </div>
  );
};

export default PieChartComponent;
