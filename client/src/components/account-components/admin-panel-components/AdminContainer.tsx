import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocationsTable from './LocationsTable';
import Box from '@mui/material/Box';
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import UsersTable from './UsersTable';

const AdminContainer = () => {
    const [option, setOption] = useState('users');
  
    const handleOptionChange = () => {
      switch (option) {
        case 'locations':
          return <LocationsTable />;
        case 'users':
          return <UsersTable />;
      }
    };

    return (
        <Card sx={{ width: '100%', height:  '100%', boxShadow: 'none' }}>
          <CardContent sx={{display: 'flex'}}>  
            <AdminSidebar setOption={setOption}/>
            <Box sx={{width: '100%'}}>
                {handleOptionChange()}
            </Box>
          </CardContent>
        </Card>
      );
}

export default AdminContainer