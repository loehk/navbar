import locationModel from '../models/locationModel';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

export const createLocation = async (req: Request, res: Response) => {
  const { email, phoneNumber, website, moderators, happy_hours, place_id } = req.body;

  try {
    const newLocation = new locationModel();

    if (email) {
      newLocation.email = email;
    }
    if (phoneNumber) {
      newLocation.phoneNumber = phoneNumber;
    }
    if (website) {
      newLocation.website = website;
    }
    if (moderators) {
      newLocation.moderators = moderators;
    }
    if (happy_hours){
      newLocation.happy_hours = happy_hours;
    }
    if (place_id){
      newLocation.place_id = place_id
    }

    newLocation.save();
    res.status(201).json({ message: `New Location made` });
  } catch (err) {
    res.send(err);
  }
};

export const updateLocationById = async (req: any, res:Response)=>{
  const id = req.body._id;
  const place_id = req.body.place_id;
  if(!id || !place_id){
    return res.status(400).json({message: "please provide id"})
  }
  try{
    const { email, phoneNumber, website, moderators, happy_hours} = req.body;
    let location;
    if(id){
      location = await locationModel.findById(id)
    }else if (place_id){
      location = await locationModel.findOne({place_id:place_id})
    }
    console.log(location)
    if (location){
      if (email) {
        location.email = email;
      }
      if (phoneNumber) {
        location.phoneNumber = phoneNumber;
      }
      if (website) {
        location.website = website;
      }
      if (moderators) {
        location.moderators = moderators;
      }
      if (happy_hours){
        location.happy_hours = happy_hours;
      }
      if(place_id){
        location.place_id = place_id
      }
      location.save()
      return res.status(200).json(location)
    }
    const dto = removeModerators(location)
    return res.json(dto)
  } catch(err){
    console.log(err)
  }
}

const removeModerators =(location:any)=>{
  const {moderators, ...locationData} = location;
  return (locationData)
}

export const getLocationByPlaceId = async (req: any, res:Response)=>{
  const place_id = req.body.placeId || req.params.placeId || null;
  if(!place_id){
    return res.status(400).json({message: "please provide place_id"})
  }
  try{
    const location :any = await locationModel.findOne({place_id:place_id})
    if (location){
      const {_doc, $__, $isNew} = location;

      let isHappyHour = false;
      const periods = _doc.happy_hours.periods
      const today = periods.find((period: { start: { day: number, minutes: number, hours:number}, end: { day: number, minutes: number, hours:number}; })=>{return period.start.day === dayjs().day()})
      if(today){
        const start = dayjs().day(today.start.day).hour(today.start.hours).minute(today.start.minutes)
        const end = dayjs().day(today.end.day).hour(today.end.hours).minute(today.end.minutes)
        isHappyHour = dayjs().isBefore(end) && dayjs().isAfter(start)
      }
      const {createdAt, updatedAt, __v, ...locationWithModerators} = _doc;
      const locationData = removeModerators(locationWithModerators)

      return res.json({isHappyHour, ...locationData})
    }
    return res.json({})
  } catch(err){
    console.log(err)
  }
}


export const getLocations = async (req: any, res: Response) => {
  try {
    const locations = await locationModel.find();
    const places = locations.map(({_doc, $__, $isNew})=>_doc)

    if (req.user?.isAdmin) {
      res.json(places);
    }else{

      const dto :any[] = places.map((location)=>{
        let isHappyHour = false;
        const periods = location.happy_hours.periods
        const today = periods.find((period: { start: { day: number, minutes: number, hours:number}, end: { day: number, minutes: number, hours:number}; })=>{return period.start.day === dayjs().day()})
        if(today){
          const start = dayjs().day(today.start.day).hour(today.start.hours).minute(today.start.minutes)
          const end = dayjs().day(today.end.day).hour(today.end.hours).minute(today.end.minutes)
          isHappyHour = dayjs().isBefore(end) && dayjs().isAfter(start)
    }
        return {isHappyHour:isHappyHour, ...location}
      
       })

      const classifiedDto = dto!.map(({ moderators, createdAt, updatedAt, __v, ...locationsData }) => locationsData);
      return res.json(classifiedDto);
    }
  } catch (err) {
    console.log(err);
  }
};
