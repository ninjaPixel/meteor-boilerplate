import React from 'react';
import PropTypes from 'prop-types';
import useResizeAware from 'react-resize-aware';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { paperStyle } from '../../styles/common';

const propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number,
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  paperClassName: PropTypes.string, // style applied when the paper is rendered
  flatClassName: PropTypes.string, // style when paper is not rendered (e.g. on mobile)
  breakPoint: PropTypes.number,
};

const defaultProps = {
  title: null,
  paperClassName: null,
  flatClassName: null,
  width: 0,
  breakPoint: 600,
};

const ResponsivePaper = props => {
  const { classes, width, children, paperClassName, flatClassName, title, breakPoint } = props;
  const titleVariant = 'h4';
  if (width >= breakPoint) {
    if (title) {
      return (
        <div className={classes.horizontalContainer}>
          <div className={classes.titleContainer}>
            <Typography variant={titleVariant} className={classes.titleHorizontal}>
              {title}
            </Typography>
          </div>
          <div className={classes.paperContainer}>
            <Paper className={paperClassName || classes.paper}>{children}</Paper>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.centeredContainer}>
        <Paper className={paperClassName || classes.paper}>{children}</Paper>
      </div>
    );
  }
  return (
    <div className={flatClassName}>
      <Typography variant={titleVariant} className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

ResponsivePaper.propTypes = propTypes;

ResponsivePaper.defaultProps = defaultProps;

const style = theme => ({
  paper: { ...paperStyle(theme), maxWidth: theme.spacing(14), marginLeft: theme.spacing(4) },
  title: {
    marginBottom: theme.spacing(1),
  },
  titleHorizontal: {
    textAlign: 'right',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  horizontalContainer: {
    display: 'flex',
  },
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  paperContainer: {
    flex: 3,
  },
});

function Wrapped(props) {
  const [resizeListener, sizes] = useResizeAware();
  return (
    <div style={{ position: 'relative', width: '100%', flex: 1 }}>
      {resizeListener}
      <ResponsivePaper {...props} width={sizes.width} />
    </div>
  );
}

export default withStyles(style)(Wrapped);
