import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function SmartCard({ title, amount, color, img, h }) {
  return (
    <div className="bg-white rounded-xl  shadow-sm p-4 text-left w-full min-h-[120px] flex items-center justify-between gap-4 transition-all hover:shadow-md">
      {/* Text Area */}
      <div className="flex-1 min-w-0">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight truncate ${color}`}>
          {amount}
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-medium mt-1 truncate">
          {title}
        </p>
      </div>
      
      {/* Icon/Image Wrapper Area */}
      <div className="flex-shrink-0">
        <img 
          src={img} 
          className={`${h || 'h-12 w-12'} object-contain`} 
          alt={`${title} icon`} 
        />
      </div>
    </div>
  );
}