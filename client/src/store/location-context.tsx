import React, { useState } from 'react';

type LocationContextProviderProps = {
  children: React.ReactNode;
};

type LocationContextType = {
  currentLocation: {},
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
};

export const LocationContext = React.createContext<LocationContextType>(null);

export const LocationContextProvider = ({ children }: LocationContextProviderProps) => {
  // in case of location service issues, the default value is the center of Riga
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 56.95,
    longitude: 24.1,
  });

  return (
    <LocationContext.Provider value={{currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
