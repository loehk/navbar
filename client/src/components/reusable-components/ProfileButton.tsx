import PortraitRoundedIcon from '@mui/icons-material/PortraitRounded';
import styles from './ProfileButton.module.scss';

type Props = {};

function ProfileButton({}: Props) {
  return (
    <button className={styles.profileButton}>
      <PortraitRoundedIcon sx={{ fontSize: 70, color: '#5d536b'}} />
    </button>
  );
}

export default ProfileButton;
