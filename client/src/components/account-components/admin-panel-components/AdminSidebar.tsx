import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type Props = {
    setOption: (active: string) => void;
  }

const AdminSidebar = (setOption: Props) => {

    const handleChange = (str: string) => {
        setOption.setOption(str);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 250, height: 'auto', bgcolor: 'background.paper' }}
            component="nav"
            >
             <ListItemButton onClick={() => handleChange('users')}>
                <ListItemText secondary="Users mangment" />
            </ListItemButton>
            <ListItemButton onClick={() => handleChange('locations')}>
                <ListItemText secondary="Locations managment" />
            </ListItemButton>
      </List>
    )
}

export default AdminSidebar
