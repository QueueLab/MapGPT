'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export enum MapToggleEnum {
  FreeMode,
  RealTimeMode,
}

interface MapToggleContextType {
  mapType: MapToggleEnum;
  setMapType: (type: MapToggleEnum) => void;
}

const MapToggleContext = createContext<MapToggleContextType | undefined>(undefined);

interface MapToggleProviderProps {
  children: ReactNode;
}

export const MapToggleProvider: React.FC<MapToggleProviderProps> = ({ children }) => {
  const [mapToggleState, setMapToggle] = useState<MapToggleEnum>(MapToggleEnum.FreeMode);

  const setMapType = useCallback((type: MapToggleEnum) => {
    setMapToggle(prevType => {
      if (prevType !== type) {
        return type;
      }
      return prevType;
    });
  }, []);

  return (
    <MapToggleContext.Provider value={{ mapType: mapToggleState, setMapType }}>
      {children}
    </MapToggleContext.Provider>
  );
};

export const useMapToggle = () => {
  const context = useContext(MapToggleContext);
  if (context === undefined) {
    throw new Error('map toogle context must be used within an map toggle provider');
  }
  return context;
};
