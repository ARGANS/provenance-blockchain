// components/socialButton.js
import Image from 'next/image';
import socialButtonImg from '../public/some.png';
import { Typography, Button } from '@material-ui/core'

const SocialButton = () => {
  return (
    <Button className="w-56 h-10"
      disableElevation
        variant='contained'
        color='secondary'
    >
      <div className="flex p-1 align-baseline"><Image src={ socialButtonImg} alt="Social Media Login" height="20px" width="40px"/></div>
      <Typography variant='button'>
        Access profile
      </Typography>
    </Button>
  );
};

export default SocialButton;
