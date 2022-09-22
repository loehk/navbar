import jwt, { Secret } from 'jsonwebtoken';
import userModel from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET || 'secret';

export const authenticateUserProfileActions = (req: any, res: Response, next: NextFunction) => {
  const onDecode = async (error: any, decoded: { _id: any }) => {
    if (error) {
      return res.status(401).send('Invalid Token');
    }
    const sessionUser = await userModel.findById(decoded._id);
    if (sessionUser) {
      req.user = sessionUser;
      if (
        req.user?.isAdmin ||
        req.user?._id.toString() === req.params._id ||
        req.body._id == req.user?._id.toString()
      ) {
        next();
      } else {
        return res.status(401).send('Please log in');
      }
    }
  };

  const token = req.body.token || req.query.token || req.cookies['session_token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => onDecode(err, decoded));
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

export const authenticateLocationRights = (req: any, res: Response, next: NextFunction) => {
  const onDecode = async (error: any, decoded: { _id: any }) => {
    if (error) {
      return res.status(401).send('Invalid Token');
    }
    const sessionUser = await userModel.findById(decoded._id);
    if (sessionUser) {
      req.user = sessionUser;
      if (req.user.isAdmin) {
        next();
      }
      if (req.params.location_id && req.body.location_id) {
        if (req.params.location_id !== req.body.location_id) {
          return res.status(400).send('Body and param id is not the same');
        }
      }
      const locationId = req.params.location_id || req.body.location_id;
      if (req.user?.locations?.includes(locationId)) {
        next();
      }
      return res.status(403).send('You are not a moderator for this location');
    }
  };

  const token = req.body.token || req.query.token || req.cookies['session_token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => onDecode(err, decoded));
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

export const authenticateAdminActions = (req: any, res: Response, next: NextFunction) => {
  const onDecode = async (error: any, decoded: { _id: any }) => {
    if (error) {
      return res.status(401).send('Invalid Token');
    }
    const sessionUser = await userModel.findById(decoded._id);
    if (sessionUser) {
      req.user = sessionUser;
      if (req.user.isAdmin) {
        next();
      }
      return res.status(403).send('Forbidden');
    }
  };

  const token = req.body.token || req.query.token || req.cookies['token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => onDecode(err, decoded));
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

export const addUserToRequest = (req: any, res: Response, next: NextFunction) => {
  const onDecode = async (error: any, decoded: { _id: any }) => {
    if (error) {
      return res.status(401).send('Invalid Token');
    }
    const sessionUser = await userModel.findById(decoded._id);
    if (sessionUser) {
      req.user = sessionUser;
    }
    next();
  };

  const token = req.body.token || req.query.token || req.cookies['token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => onDecode(err, decoded));
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};
