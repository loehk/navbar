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
import Switch from '@mui/material/Switch';
import { Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    _id: number;
    username: string;
    email: string;
    profilePictureBase64: string;
    isAdmin: boolean;
    createdAt: string;
}


const LocationsTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

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

    const handleDelete = async (email: string) => {
        await fetch(`http://localhost:3000/user/delete/${email}`, {
            'method': 'DELETE',
            'credentials': 'include',
            'mode': 'cors',
            'headers': {
            'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
            }
        })
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setAdmin = async (email: string, isAdmin: boolean) => {
        const admin = !isAdmin;
        await fetch(`http://localhost:3000/user/setAdmin/${email}/${admin}`,{
                'method': 'PUT',
                'credentials': 'include',
                'mode': 'cors',
                'headers': {
                'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                }
            })
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (        
        <Box sx={{minWidth: '90%'}}>
        <TableContainer component={Paper} sx={{ minWidth: '100%',height: '60vh', maxHeight: '60vh' , overflowY: 'auto', WebkitOverflowScrolling: 'touch',overflowX: 'auto', '&::-webkit-scrollbar': {display: 'none'}}}>
        <Table sx={{ minWidth: '100%', border: 0 }}  stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Member since</TableCell>
                <TableCell align="right">Admin</TableCell>
                <TableCell align="right">Options</TableCell>
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
                        checked={row.isAdmin}
                        color="secondary"
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={() => setAdmin(row.email, row.isAdmin)}
                        />
                </TableCell>
                <TableCell align="right">
                    <Button variant="contained" size='small' color="error" onClick={() => handleDelete(row.email)}>Delete</Button>
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