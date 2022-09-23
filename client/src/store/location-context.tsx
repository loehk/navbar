import { createContext, Dispatch, SetStateAction, useState } from 'react';

export type locationType = {
  lat: number;
  lng: number;
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
    lat: 56.95,
    lng: 24.1,
  });

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
