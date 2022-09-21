import PortraitRoundedIcon from '@mui/icons-material/PortraitRounded';
import styles from './ProfileButton.module.scss';

type Props = {};

function ProfileButton({}: Props) {
  return (
    <button className={styles.profileButton}>
      <PortraitRoundedIcon sx={{ fontSize: 40, color: '#272838'}} />
    </button>
  );
}

export default ProfileButton;
