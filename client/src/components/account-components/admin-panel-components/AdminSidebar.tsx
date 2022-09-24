import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const AdminSidebar = () => {

    return (
        <List
            sx={{ width: '100%', maxWidth: 250, height: 'auto', bgcolor: 'background.paper' }}
            component="nav"
            >
             <ListItemButton >
                <ListItemText secondary="Users mangment" />
            </ListItemButton>
            <ListItemButton >
                <ListItemText secondary="Locations managment" />
            </ListItemButton>
      </List>
    )
}

export default AdminSidebar
