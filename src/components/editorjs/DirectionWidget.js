import { IconButton, styled, Typography } from "@material-ui/core";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublishIcon from '@mui/icons-material/Publish';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
    zIndex: 999,
    right: 2,
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    position: "fixed",
    alignItems: "center",
    alignSelf: "center",
    bottom: theme.spacing(2),
    // height: theme.spacing(5),
    margin: theme.spacing(5),
  
    // padding: theme.spacing(2),
    boxShadow: theme.customShadows.z20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderBottomLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    borderBottomRightRadius: theme.shape.borderRadiusMd,
   // opacity: 0.72,
    transition: theme.transitions.create("opacity"),
    '&:hover': { opacity: 0.72 }
  }));
  
  // ----------------------------------------------------------------------
  
export default function DirectionWidget({next,prev,submit,questionNumber}){

    return(
        <RootStyle>
        
             <IconButton title="Previous" aria-label="previous"color="secondary" onClick={prev} >
              <ArrowBackIcon /><Typography variant="subtitle2">Previous</Typography>
            </IconButton>
            <IconButton title="Previous" aria-label="previous"color="info" onClick={()=>{
            submit(questionNumber);
            }} >
              <PublishIcon /><Typography variant="subtitle2">Save</Typography>
            </IconButton>
            <IconButton title="Next" aria-label="next" color="primary" onClick={next}>
                <Typography variant="subtitle2">Next</Typography><ArrowForward />
            </IconButton>
        </RootStyle>
    )
}