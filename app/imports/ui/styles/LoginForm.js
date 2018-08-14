const style = theme => ({
  form: {
    width: '90%',
    maxWidth: 350,
    minWidth: 250,
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
    minHeight: 12,
  },
  button: {
    marginTop: 16,
    minWidth: 110,
    width: '100%',
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
