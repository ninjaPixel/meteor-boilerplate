const style = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flex: 1,
    marginBottom: 100,
  },
  link: {
    color: theme.typography.body1.color,
    cursor: 'pointer',
  },
  insetContent: {
    paddingLeft: theme.spacing.unit * 2,
  },
  button: {
    alignSelf: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  cardContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
  },
  section: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 0.5,
  },
  sectionContent: {
    width: '100%',
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  section1: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 0.5,

  },
  fullWidth: {
    width: '100%',
  },
  noPadding: {
    padding: 0,
  },
});

export default style;
