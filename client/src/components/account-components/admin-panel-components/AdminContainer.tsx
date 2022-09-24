import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { UserContext } from '../../landing-components/authentication/UserContext';
import { useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import UsersTable from './UsersTable';




const AdminContainer = () => {
    const userContext = useContext(UserContext);

    return (
        <Card sx={{ width: '100%', height:  '100%', boxShadow: 'none' }}>
          <CardContent sx={{display: 'flex'}}>  
            <AdminSidebar />
            <UsersTable />
          </CardContent>
        </Card>
      );
}

export default AdminContainer