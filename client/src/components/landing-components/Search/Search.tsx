import styles from "./Search.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

type Props = {}

function Search({}: Props) {
  return (
    <div className={styles.searchContainer}>
        <SearchIcon  sx={{ fontSize: 30, color: '#7d6b91'}} />
        <TextField variant="standard" placeholder="Search" />
        <Button sx={{ marginLeft: 10, textTransform: "none", fontSize: 15}} size="large" variant="contained">Search</Button>
    </div>
  )
}

export default Search