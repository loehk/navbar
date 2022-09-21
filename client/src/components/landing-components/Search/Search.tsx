import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';

type Props = {};

function Search({}: Props) {
  return (
    <div className={styles.searchContainer}>
      <SearchIcon sx={{ fontSize: 30, color: '#7d6b91', marginRight: 2 }} />
      <TextField
        sx={{
          width: '80%',
          '& .MuiInput-underline:before': { borderBottomColor: 'rgb(204, 202, 202)' },
          '& .MuiInput-underline:after': { borderBottomColor: '#7d6b91' }
        }}
        variant="standard"
        placeholder="Search"
      />
      <Button
        sx={{ marginLeft: 10, textTransform: 'none', fontSize: 15, width: 250, padding: 1.6 }}
        size="large"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
}

export default Search;
