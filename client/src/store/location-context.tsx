import { createContext, Dispatch, SetStateAction, useState } from 'react';

export type locationType = {
  latitude: number;
  longitude: number;
};

type LocationContextProviderProps = {
  children: React.ReactNode;
};

type LocationContextType = {
  currentLocation: locationType;
  setCurrentLocation: Dispatch<SetStateAction<locationType>>;
};

export const LocationContext = createContext<LocationContextType | null>(null);

export const LocationContextProvider = ({ children }: LocationContextProviderProps) => {
  
  // default location is the center of Riga
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 56.95,
    longitude: 24.1,
  });

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children};
    </LocationContext.Provider>
  );
};
