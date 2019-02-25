import { SPACING } from './constants';

const style = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flex: 1,
    marginBottom: SPACING['96'],
  },
  link: {
    color: theme.typography.body1.color,
    cursor: 'pointer',
  },
  insetContent: {
    paddingLeft: SPACING['16'],
  },
  button: {
    alignSelf: 'center',
    marginTop: SPACING['24'],
  },
  cardContainer: {
    marginTop: SPACING['16'],
    marginBottom: SPACING['16'],
    width: '100%',
  },
  section: {
    marginTop: SPACING['48'],
    marginBottom: SPACING['4'],
  },
  sectionContent: {
    width: '100%',
    paddingLeft: SPACING['8'],
    paddingRight: SPACING['8'],
    [theme.breakpoints.up('md')]: {
      paddingLeft: SPACING['16'],
      paddingRight: SPACING['16'],
    },
  },
  section1: {
    marginTop: SPACING['24'],
    marginBottom: SPACING['4'],
  },
  fullWidth: {
    width: '100%',
  },
  noPadding: {
    padding: 0,
  },
});

export default style;
