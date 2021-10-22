import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import FolderCard from './FolderCard';
// import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

FolderList.propTypes = {
  folders: PropTypes.array.isRequired
};

export default function FolderList({ folders, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {folders.map((folder) => (
        <Grid key={folder.key} item xs={12} sm={6} md={3}>
          <FolderCard folder={folder}/>
        </Grid>
      ))}
    </Grid>
  );
}
