import { Card, Stack, Typography,Link, CardContent } from "@material-ui/core";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

FolderCard.propTypes = {
  folder: PropTypes.object,
};

export default function FolderCard({ folder }) {
  const { folderName, userid } = folder;

  return (
    <Card variant="outlined">
      <CardContent>
        <Link
          to={`${userid}/${folderName}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {folderName.toUpperCase()}
           
          </Typography>
        
        </Link>
 
      </CardContent>
    </Card>
  );
}
