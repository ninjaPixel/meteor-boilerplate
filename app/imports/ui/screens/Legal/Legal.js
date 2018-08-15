import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

const Legal = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="display1" gutterBottom>Boring legal stuff</Typography>
      <Typography>
        Lorem ipsum dolor amet iceland hoodie polaroid cardigan pitchfork. Leggings elit dolore consectetur intelligentsia air plant typewriter unicorn hella irony deserunt artisan. Kitsch sint forage proident ramps cardigan blue bottle dolore. Et sed franzen irony wayfarers celiac meditation pitchfork. Sriracha semiotics direct trade polaroid cupidatat brooklyn synth sunt. Quinoa non nostrud tofu ut live-edge 8-bit pitchfork knausgaard. Snackwave twee waistcoat gluten-free.
      </Typography>
      <Typography>
        Ut marfa knausgaard, ennui dolore prism fixie pariatur heirloom plaid lo-fi vinyl meggings chartreuse. Narwhal nostrud humblebrag excepteur ut crucifix palo santo plaid put a bird on it seitan. Green juice trust fund vinyl exercitation slow-carb chillwave chambray franzen. Bespoke farm-to-table adipisicing paleo keffiyeh shaman do in jianbing single-origin coffee celiac seitan laborum sunt kombucha. Etsy quis beard, VHS in chambray cornhole.
      </Typography>
      <Typography>
        Scenester man braid flexitarian, fanny pack af kombucha air plant. Helvetica neutra la croix wayfarers subway tile taxidermy ut literally fashion axe asymmetrical gochujang photo booth. Id ut forage small batch. Neutra put a bird on it narwhal tumeric. Aesthetic art party ramps, dreamcatcher intelligentsia flannel distillery hexagon readymade in neutra health goth mumblecore.
      </Typography>
      <Typography>
        Ut authentic scenester iPhone occupy readymade blue bottle waistcoat adipisicing pickled tattooed labore qui. Labore consectetur gochujang, humblebrag vaporware hoodie kogi commodo dolore flexitarian wayfarers. In meh copper mug, dolore woke ut helvetica art party palo santo pug microdosing enamel pin. Tilde dreamcatcher in, cliche cred eiusmod deserunt man bun sustainable actually church-key. Polaroid vexillologist ea ut yr squid umami drinking vinegar mustache flannel.
      </Typography>
      <Typography>
        Heirloom sartorial whatever nisi shoreditch reprehenderit incididunt eu. Kogi tofu ethical before they sold out in. Snackwave you probably haven't heard of them kogi, adipisicing authentic vape deserunt la croix gluten-free health goth freegan single-origin coffee sunt lomo labore. Try-hard deep v magna bitters hexagon leggings authentic, mixtape retro plaid. Etsy non viral pickled hexagon tattooed offal synth. Ex gentrify cronut selvage air plant fixie, intelligentsia photo booth cillum. Hell of keytar fixie direct trade.
      </Typography>

    </div>
  );
};


Legal.propTypes = {
  classes: PropTypes.object.isRequired,
};

Legal.defaultProps = {
};

const style = theme => ({
  root: {
  },
});

export default withStyles(style)(Legal);
