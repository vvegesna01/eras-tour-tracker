"use client";
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import data from "./data/setlist_song.json";

export const SetlistPie = () => {
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const handlePieClick = (data: any, index: number) => {
    setActiveSlice(index);
  };

  const renderLabel = (entry: any) => {
    const { album, songs } = entry;

    if (entry.index === activeSlice) {
      return `${songs}`;
    }


    return album;
  };
  

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="songs"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="black"
          label={renderLabel}
          onClick={handlePieClick}
		  fontFamily={"nine"}
		  
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))
          }
        </Pie>
        {/* <Legend align="center" /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SetlistPie;
