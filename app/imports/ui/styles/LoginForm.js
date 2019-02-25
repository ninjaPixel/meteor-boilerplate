import { SPACING } from './constants';

const style = (theme) => ({
  form: {
    width: '100%',
    padding: SPACING['16'],
    [theme.breakpoints.up('sm')]: {
      padding: 0,
      width: SPACING['512'],
    },
    maxWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
  },
  inputCaptionContainer: {
    minHeight: SPACING['32'],
  },
  caption: {
    marginTop: SPACING['24'],
  },
  link: {
    cursor: 'pointer',
    color: 'inherit',
  },
});

export default style;
