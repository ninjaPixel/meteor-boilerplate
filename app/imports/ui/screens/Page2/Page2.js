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
          Here are the typography variants available under Material UI:
        </Typography>
        <Typography variant="display4" gutterBottom noWrap align="left">
        Display 4
        </Typography>
        <Typography variant="display3" gutterBottom noWrap>
        Display 3
        </Typography>
        <Typography variant="display2" gutterBottom noWrap>
        Display 2
        </Typography>
        <Typography variant="display1" gutterBottom noWrap>
        Display 1
        </Typography>
        <Typography variant="headline" gutterBottom noWrap>
        Headline
        </Typography>
        <Typography variant="title" gutterBottom noWrap>
        Title
        </Typography>
        <Typography variant="subheading" gutterBottom noWrap>
        Subheading
        </Typography>
        <Typography variant="body2" gutterBottom>
        Body 2: Lorem ipsum dolor amet next level enamel pin art party, sartorial 90's asymmetrical photo booth tousled selvage pork belly salvia affogato listicle synth drinking vinegar. Kombucha flannel 3 wolf moon heirloom whatever four dollar toast, snackwave literally keytar iPhone food truck. Pork belly thundercats humblebrag artisan banjo schlitz mumblecore, iceland pitchfork literally sustainable you probably haven't heard of them. Twee pinterest taiyaki church-key master cleanse small batch shoreditch hexagon literally live-edge skateboard umami leggings polaroid tattooed. Shabby chic cloud bread kitsch wayfarers pitchfork.
        </Typography>
        <Typography variant="body1" gutterBottom>
        Body 1: Lorem ipsum dolor amet banjo mixtape gastropub fanny pack jean shorts ennui hashtag enamel pin selvage chambray. Post-ironic williamsburg venmo portland kogi food truck tilde locavore DIY lyft blue bottle cred four dollar toast af. Pabst knausgaard viral chicharrones, 8-bit selfies blog green juice bitters hashtag. Meggings chillwave pork belly bushwick. Stumptown godard lomo vexillologist, pitchfork humblebrag small batch biodiesel post-ironic shoreditch taxidermy sriracha austin meh.
        </Typography>
        <br />
        <Typography variant="caption" gutterBottom >
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
