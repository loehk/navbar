import { SetStateAction, Dispatch, useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { containerStyle, center, mapOptions } from './mapConfig';
import styles from './GoogleBarMap.module.scss';
import { LocationContext } from '../../../store/location-context';

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
  selectedBarId,
  setSelectedBarId,
}: {
  darkmode: boolean;
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
  nearbyBars: google.maps.places.PlaceResult[] | null;
  selectedBarId: string | null;
  setSelectedBarId: Dispatch<SetStateAction<string | null>>;
}) => {
  const locationContext = useContext(LocationContext);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onUnMount = () => {
    setMap(null);
  };

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
        <Marker position={center} />
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
                  setSelectedBarId(bar.place_id || null);
                  // map!.setZoom(17);
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
