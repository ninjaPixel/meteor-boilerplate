const style = theme => ({
  form: {
    width: theme.spacing(13),
    maxWidth: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
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
    minHeight: theme.spacing(6),
  },
  caption: {
    marginTop: theme.spacing(5),
  },
  link: {
    cursor: 'pointer',
    color: 'inherit',
  },
});

export default style;
