const style = (theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
      width: 500,
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
    minHeight: 32,
  },
  caption: {
    marginTop: 24,
  },
  link: {
    cursor: 'pointer',
    color: 'inherit',
  },
});

export default style;
