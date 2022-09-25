import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styles from '../../Settings.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { Avatar } from '@mui/material';
import axios from 'axios';

interface Props {
    location: {
        email:string;
        happy_hours:{
        periods: [{
                start: {day: number, hours: number, minutes: number}, end: {day: number, hours: number, minutes: number}, _id: string
        }]};
        isHappyHour: boolean;
        phoneNumber: number;
        moderators: string[];
        place_id: string;
        ratings: [{
            rating: number, _id: string, location: string, user: string,
        }];
        website: string;
        _id: string;
    }
}

interface User {
    _id: string;
    username: string;
    email: string;
    profilePictureBase64: string;
    isAdmin: boolean;
    createdAt: string;
}

const LocationModal = (location: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);    
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currLocation, setCurrLocation] = useState(location.location);

  useEffect(() => {
      getData();
  }, []);

  const getData = async () => {
      await axios.get("http://localhost:3000/user/get",
      {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
      })
          .then((res) => {
              setUsers(res.data);
          })
          .catch((err) => {
              console.log(err);
          });
  };

  const handleChange = (e: any) => {
      setSearch(e.target.value);
  }

  const setModerator = async (id: string, moderators: string[]) => {
        await axios.post("http://localhost:3000/location/update", { _id: location.location._id, place_id: location.location.place_id , moderators: moderators.includes(id) ? moderators.filter(val => val !== id) : [...moderators, id] })
            .then((res) => {
                setCurrLocation(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

  return (
      <div>
        <Button variant="contained" onClick={handleOpen}>Open</Button>
        <Modal open={open} onClose={handleClose} 
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 600,
          }}>
          <Fade in={open}>
            <div className={styles.modal}>
                <Box sx={{padding: 5}}>
                    <Typography  variant="h6" component="div">
                        Location settings
                    </Typography>
                    <Typography  variant="caption" component="div">
                        Email: {location.location.email}
                    </Typography>
                    <Typography  variant="caption" component="div">
                        Phone: {location.location.phoneNumber}
                    </Typography>
                    <Typography  variant="caption" component="div">
                        Website: {location.location.website}
                    </Typography>

                    <Box sx={{minWidth: '90%'}}>
                        <TableContainer component={Paper} sx={{ minWidth: '100%',height: '35vh', maxHeight: '35vh' , overflowY: 'auto', WebkitOverflowScrolling: 'touch',overflowX: 'auto', '&::-webkit-scrollbar': {display: 'none'}}}>
                        <Table sx={{ minWidth: '100%', border: 0 }}  stickyHeader aria-label="sticky table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Picture</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Member since</TableCell>
                                <TableCell align="right">Moderators</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {users.filter((e) => search !== '' ? (e.username.includes(search) || e.email.includes(search)) : e ).map((row) => (
                                <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    <Avatar src={row.profilePictureBase64} sx={{ mr: 2 }} />
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{wordBreak: 'break-all'}}>
                                        {row.username}
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{wordBreak: 'break-all'}}>{row.email}</TableCell>
                                <TableCell align="right" sx={{wordBreak: 'break-all'}}>{row.createdAt.replaceAll('-', '/').replace('T', '\n').split('.')[0]}</TableCell>
                                <TableCell align="right">
                                    <Switch
                                        checked={currLocation.moderators.includes(row._id)}
                                        color="secondary"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        onChange={() => setModerator(row._id, currLocation.moderators)}
                                        />
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <Box sx={{mt: 1, width: '100%'}}>
                            <TextField id="outlined-basic" label="Search" variant="standard" onChange={e => handleChange(e)}/>
                        </Box>
                    </Box>
                </Box>
            </div>
          </Fade>
        </Modal>
    </div>
  );
}

export default LocationModal;