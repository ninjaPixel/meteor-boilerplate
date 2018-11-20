import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import rootStyles from '../../styles/root';

class Page2 extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography>
          Here are the typography variants available under Material UI. Note that fonts are loaded in
          'app/client/main.html' and specific font settings (such as font weights for different elements) are declared
          in 'app/imports/ui/styles/Theme.js'
        </Typography>
        <Typography variant="h1" gutterBottom noWrap align="left">
          h1 Heading
        </Typography>
        <Typography variant="h2" gutterBottom noWrap>
          h2 Heading
        </Typography>
        <Typography variant="h3" gutterBottom noWrap>
          h3 Heading
        </Typography>
        <Typography variant="h4" gutterBottom noWrap>
          h4 Heading
        </Typography>
        <Typography variant="h5" gutterBottom noWrap>
          h5 Heading
        </Typography>
        <Typography variant="h6" gutterBottom noWrap>
          h6 Heading
        </Typography>
        <Typography variant="subtitle1" gutterBottom noWrap>
          Subtitle 1
        </Typography>
        <Typography variant="subtitle2" gutterBottom noWrap>
          Subtitle 2
        </Typography>
        <Typography variant="body1" gutterBottom>
          Body 1: Lorem ipsum dolor amet next level enamel pin art party, sartorial 90's asymmetrical photo booth
          tousled selvage pork belly salvia affogato listicle synth drinking vinegar. Kombucha flannel 3 wolf moon
          heirloom whatever four dollar toast, snackwave literally keytar iPhone food truck. Pork belly thundercats
          humblebrag artisan banjo schlitz mumblecore, iceland pitchfork literally sustainable you probably haven't
          heard of them. Twee pinterest taiyaki church-key master cleanse small batch shoreditch hexagon literally
          live-edge skateboard umami leggings polaroid tattooed. Shabby chic cloud bread kitsch wayfarers pitchfork.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Body 2: Lorem ipsum dolor amet banjo mixtape gastropub fanny pack jean shorts ennui hashtag enamel pin selvage
          chambray. Post-ironic williamsburg venmo portland kogi food truck tilde locavore DIY lyft blue bottle cred
          four dollar toast af. Pabst knausgaard viral chicharrones, 8-bit selfies blog green juice bitters hashtag.
          Meggings chillwave pork belly bushwick. Stumptown godard lomo vexillologist, pitchfork humblebrag small batch
          biodiesel post-ironic shoreditch taxidermy sriracha austin meh.
        </Typography>
        <br />
        <Typography variant="caption" gutterBottom>
          Caption
        </Typography>
      </div>
    );
  }
}

Page2.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

Page2.defaultProps = {
  user: null,
};

const style = theme => ({
  ...rootStyles.default(theme),
});

export default withStyles(style)(Page2);
