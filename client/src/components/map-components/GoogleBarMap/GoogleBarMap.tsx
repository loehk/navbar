import { SetStateAction, Dispatch } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { containerStyle, center, mapOptions } from './mapConfig';
import styles from './GoogleBarMap.module.scss';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

const GoogleBarMap = ({
  darkmode,
  map,
  setMap,
  nearbyBars,
  selectedBar,
  setSelectedBar,
}: {
  darkmode: boolean;
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
  nearbyBars: google.maps.places.PlaceResult[] | null;
  selectedBar: google.maps.places.PlaceResult | null;
  setSelectedBar: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ['places'],
  });

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onUnMount = () => {
    setMap(null);
  };

  if (!isLoaded) return <div>Map Loading ...</div>;

  return (
    <div className={styles.googleBarMapContainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions(darkmode)}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnMount}
      >
        {nearbyBars
          ? nearbyBars.map(bar => (
              <Marker
                key={bar.place_id}
                position={{
                  lat: bar.geometry?.location?.lat()!,
                  lng: bar.geometry?.location?.lng()!,
                }}
                icon={{
                  url: '/icons/coctail-icon.svg',
                  // @ts-ignore
                  scaledSize: {
                    height: 30,
                    width: 30,
                  },
                }}
                onClick={() => {
                  setSelectedBar(bar);
                  map!.setZoom(18);
                  map!.panTo(bar.geometry?.location!);
                }}
              />
            ))
          : null}
      </GoogleMap>
    </div>
  );
};

export default GoogleBarMap;
