import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PublishIcon from '@mui/icons-material/Publish';
import ListIcon from '@mui/icons-material/List';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';
// import { Icon } from "@iconify/react";

const actions = [
  { icon: <PublishIcon />, name: 'Upload Image' },
  { icon: <ListIcon />, name: 'Image List' },
//   { icon: <PrintIcon />, name: 'Print' },
//   { icon: <ShareIcon />, name: 'Share' },
];

export default function SpeedDialTogglePhoto({togglePhotolist}) {
  return (
    <Box >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={togglePhotolist}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}