import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

class Page2 extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom>Hipster Ipsum</Typography>
        <Typography>
          Lorem ipsum dolor amet banjo mixtape gastropub fanny pack jean shorts ennui hashtag enamel pin selvage chambray. Post-ironic williamsburg venmo portland kogi food truck tilde locavore DIY lyft blue bottle cred four dollar toast af. Pabst knausgaard viral chicharrones, 8-bit selfies blog green juice bitters hashtag. Meggings chillwave pork belly bushwick. Stumptown godard lomo vexillologist, pitchfork humblebrag small batch biodiesel post-ironic shoreditch taxidermy sriracha austin meh.
        </Typography>
        <Typography>
          Kale chips thundercats 8-bit quinoa chillwave pitchfork you probably haven't heard of them, mumblecore everyday carry biodiesel beard four dollar toast. Listicle vegan pok pok, four dollar toast you probably haven't heard of them narwhal cliche chambray gentrify kombucha deep v master cleanse craft beer YOLO. Distillery fashion axe vape trust fund +1 vaporware heirloom brunch roof party hammock venmo tote bag readymade. Irony williamsburg chambray ugh gentrify plaid roof party fam franzen truffaut quinoa. Raclette selfies master cleanse, irony craft beer food truck salvia DIY knausgaard jianbing jean shorts taxidermy sustainable kombucha locavore.
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
  root: {
  },
});

export default withStyles(style)(Page2);
