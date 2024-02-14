import { Avatar } from '@mui/material';

import { useUser } from '../context/UserContext';

const UserProfilePicture = ({ width, height }) => {
  const userContext = useUser();

  return (
    <Avatar
      alt="Profile Picture"
      src={userContext.profilePictureUrl ? userContext.profilePictureUrl : null}
      sx={{
        width: width ? width : '5rem',
        height: height ? height : '5rem',
      }}
    ></Avatar>
  );
};

export default UserProfilePicture;
