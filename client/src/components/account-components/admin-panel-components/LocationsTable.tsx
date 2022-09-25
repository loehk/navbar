import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LocationModal from './Modals/LocationModal';

interface Location {
    email:string;
    happy_hours:{
    periods: [{
            start: {day: number, hours: number, minutes: number}, end: {day: number, hours: number, minutes: number}, _id: string
    }]};
    isHappyHour: boolean;
    phoneNumber: number;
    place_id: string;
    ratings: [{
        rating: number, _id: string, location: string, user: string,
    }];
    website: string;
    _id: string;
}

const LocationsTable = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.get("http://localhost:3000/location/get",
        {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((res) => {
                setLocations(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e: any) => {
        setSearch(e.target.value);
    }

    return (        
        <Box sx={{minWidth: '90%'}}>
        <TableContainer component={Paper} sx={{ minWidth: '100%',height: '60vh', maxHeight: '60vh' , overflowY: 'auto', WebkitOverflowScrolling: 'touch',overflowX: 'auto', '&::-webkit-scrollbar': {display: 'none'}}}>
        <Table sx={{ minWidth: '100%', border: 0 }}  stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Phone nr</TableCell>
                <TableCell>Website</TableCell>
                <TableCell align="right">Settings</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {locations.filter((e) => search !== '' ? (e.email.includes(search) || e.phoneNumber.toString().includes(search)) : e ).map((row) => (
                <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.email}
                </TableCell>
                <TableCell component="th" scope="row" sx={{wordBreak: 'break-all'}}>
                    {row.phoneNumber}
                </TableCell>
                <TableCell component="th" scope="row" sx={{wordBreak: 'break-all'}}>
                    {row.website}
                </TableCell>
                <TableCell align="right">
                    <LocationModal  location={row}/>
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
    );
}   

export default LocationsTable;