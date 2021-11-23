import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PublishIcon from '@mui/icons-material/Publish';
import ListIcon from '@mui/icons-material/List';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CopyAllIcon from '@mui/icons-material/CopyAll';
// import { Icon } from "@iconify/react";
import { styled } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';
import PropTypes from 'prop-types';

//-------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    zIndex: 999,
    right: 0,
    display: 'flex',
    // cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    bottom: theme.spacing(16),
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.25),
   boxShadow: theme.customShadows.z20,
   color: theme.palette.text.primary,
   backgroundColor: theme.palette.background.paper,
   borderTopLeftRadius: theme.shape.borderRadiusMd,
   borderBottomLeftRadius: theme.shape.borderRadiusMd,
    transition: theme.transitions.create('opacity'),
    '&:hover': { opacity: 0.72 }
  }));
  //-----------------------------------------------------------------


const actions = [
  { icon: <PublishIcon />, name: 'Publish' },
  { icon: <CopyAllIcon />, name: 'Copy' },
  // { icon: <PrintIcon />, name: 'Print' },
  // { icon: <ShareIcon />, name: 'Share' },
];

ContentSpeedDial.propTypes={
  handleDraft:PropTypes.func,
  copyDraft:PropTypes.func
}

export default function ContentSpeedDial({handleDraft,copyDraft}) {
  return (
      <RootStyle>
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
            onClick={()=>{
              if(action.name=='Copy'){
                copyDraft();
              }else{
                handleDraft();
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
    </RootStyle>
  );
}