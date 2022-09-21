import locationModel from '../models/locationModel';
import { Request, Response } from 'express';

export const createLocation = async (req: Request, res: Response) => {
  const { name, latitude, longitude, address, email, phoneNumber, website, moderators } = req.body;

  if (!name || !latitude || !longitude || !address) {
    return res
      .status(400)
      .json({ error: 'Please make sure to enter name, latitutde, longitude, address' });
  }

  try {
    const newLocation = new locationModel({
      name: name,
      latitude: latitude,
      longitude: longitude,
      address: address,
    });

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

    newLocation.save();
    res.status(201).json({ message: `New location ${name} made at ${address}` });
  } catch (err) {
    res.send(err);
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationModel.find();
    if (req.user?.isAdmin) {
      res.status(200).json(locations);
    }
    //make DTO so the regular users can't see sensitive moderator data
    const dto = locations.map(({ moderators, ...locationsData }) => locationsData);
    res.status(200).json(dto);
  } catch (err) {
    console.log(err);
  }
};
