import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

type Props = {};

function Search({}: Props) {
  return (
    <motion.div initial={{y: 100, opacity: 0.2}} animate={{y: 0, opacity: 1}} transition={{ duration: 0.5, delay: 0.2}} className={styles.searchContainer}>
      <SearchIcon sx={{ fontSize: 30, color: '#7d6b91', margin: 1.5 }} />
      <TextField
        sx={{
          width: '100%',
          '& .MuiInput-underline:before': { borderBottomColor: 'rgb(204, 202, 202)' },
          '& .MuiInput-underline:after': { borderBottomColor: '#7d6b91' },
        }}
        variant="standard"
        placeholder="Search"
      />
      <Button
        sx={{ marginLeft: 5, textTransform: 'none', fontSize: 15, width: '45%', padding: 1.6 }}
        size="large"
        variant="contained"
      >
        Search
      </Button>
    </motion.div>
  );
}

export default Search;
