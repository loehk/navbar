import { motion } from 'framer-motion';
import styles from './SelectedBarContainer.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OpeningHours from './OpeningHours/OpeningHours';
import axios from 'axios';
import dayjs from 'dayjs';

interface OpeningHoursDay {
  start: Date;
  end: Date;
}

export interface LocationObj {
  name: string;
  latitude: number;
  longitude: number;
  place_id: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  address: string;
  photos: string[];
  opening_hours: {
    normal_days: {
      monday: OpeningHoursDay;
      tuesday: OpeningHoursDay;
      wednesday: OpeningHoursDay;
      thursday: OpeningHoursDay;
      friday: OpeningHoursDay;
      saturday: OpeningHoursDay;
      sunday: OpeningHoursDay;
    };
  };
}

export default function ({
  map,
  selectedBarId,
  setSelectedBarId,
}: {
  map: google.maps.Map;
  selectedBarId: string;
  setSelectedBarId: Dispatch<SetStateAction<string | null>>;
}) {
  const [fetchedBar, setFetchedBar] = useState<google.maps.places.PlaceResult | null>(null);
  const [navBarInfo, setNavBarInfo] = useState<any>();

  useEffect(() => {
    new google.maps.places.PlacesService(map).getDetails(
      {
        placeId: selectedBarId,
        fields: ['name', 'photos', 'opening_hours'],
      },
      (place, status) => {
        if (status === 'OK') {
          console.log('fetched bar', place);
          setFetchedBar(place);
        }
      },
    );
  }, [selectedBarId]);


  useEffect(()=>{
    if(map){
      if(selectedBarId){
        axios.get(`http://localhost:3000/location/getPlace/${selectedBarId}`).then((response)=>{
          setNavBarInfo(response.data)
        })
      }
    }
  },[selectedBarId])

  const getForDay=(selectedDay:number)=>{
    if(navBarInfo){
      const periods = navBarInfo?.happy_hours?.periods;
      if(periods){
        const day = periods.find((element: any)=>{return element.start.day ===selectedDay});
        if(day){
          return getFormattedHappyHour(day);
        }
      }
    }
    return "No happy hours"

  }
  return (
    <motion.div
      className={styles.SelectedBarContainer}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <button onClick={() => setSelectedBarId(null)}>go back</button>
      {fetchedBar ? (
        <>
          {fetchedBar.photos ? (
            <img className={styles.mainImage} src={fetchedBar.photos[0].getUrl()} alt="bar photo" />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <div className={styles.infoContainer}>
            <h1 className={styles.barName}>{fetchedBar.name}</h1>
            <OpeningHours weekday_text={fetchedBar.opening_hours?.weekday_text} />
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.barName}> Happy hours</h1>
            <h4>{navBarInfo?.isHappyHour ? "Happy hour is on!":"It isn't happy hour :("}</h4>
            <div className={styles.OpeningHours}>
            <ul className={styles.dayName}>
              <li key={"happyHour_mon"}>Monday</li>
              <li key={"happyHour_tue"}>Tuesday</li>
              <li key={"happyHour_wed"}>Wednesday</li>
              <li key={"happyHour_thur"}>Thursday</li>
              <li key={"happyHour_fri"}>Friday</li>
              <li key={"happyHour_sat"}>Saturday</li>
              <li key={"happyHour_sun"}>Sunday</li>

            </ul>
            <ul className={styles.dayTime}>
            <li></li>
              <li key={"happyHour_mon_date"}>{getForDay(1)}</li>
              <li key={"happyHour_tue_date"}>{getForDay(2)}</li>
              <li key={"happyHour_wed_date"}>{getForDay(3)}</li>
              <li key={"happyHour_thur_date"}>{getForDay(4)}</li>
              <li key={"happyHour_fri_date"}>{getForDay(5)}</li>
              <li key={"happyHour_sat_date"}>{getForDay(6)}</li>
              <li key={"happyHour_sun_date"}>{getForDay(0)}</li>
            </ul>
            </div>

            <div className={styles.OpeningHours}>
    </div>


          </div>
        </>
      ) : (
        'Loading..'
      )}
    </motion.div>
  );
}
function getFormattedHappyHour(day: any) {
  let startDaytime = dayjs();
  let endDaytime = dayjs();
  if (day) {
    startDaytime = startDaytime.set('second', 0).set('minute', 0);
    endDaytime = endDaytime.set('second', 0).set('minute', 0)
    if (day?.start?.day) {
      startDaytime = startDaytime.set('day', day.start.day);
    }
    if (day?.start?.hours) {
      startDaytime = startDaytime.set('hour', day.start.hours);
    }
    if (day?.start?.minutes) {
      startDaytime = startDaytime.set('minute', day.start.minutes);
    }
    if (day?.end?.day) {
      endDaytime = endDaytime.set('day', day.end.day);
    }
    if (day?.end?.hours) {
      endDaytime = endDaytime.set('hour', day.end.hours);
    }
    if (day?.end?.minutes) {
      endDaytime = endDaytime.set('minute', day.end.minutes);
    }
  }
  return `${startDaytime.format('hh:mm A')} - ${endDaytime.format('hh:mm A')}`;
}

