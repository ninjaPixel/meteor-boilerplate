export const middleOfScreenStyle = theme => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: theme.spacing(3),
});

export const linkStyle = theme => ({
  cursor: 'pointer',
  color: theme.palette.secondary.main,
});

export const buttonStyle = theme => ({
  marginTop: theme.spacing(4),
  minWidth: 110,
  width: '100%',
});

export const paperStyle = theme => ({
  padding: theme.spacing(3, 5, 5, 4),
});

export const inputStyle = theme => ({
  width: '100%',
});

export const stackStyle = theme => ({
  '& > * + *': {
    marginTop: theme.spacing(3),
  },
});

export const stackStyleLG = theme => ({
  '& > * + *': {
    marginTop: theme.spacing(8),
  },
});

export const documentLayoutStyle = theme => ({
  flex: 1,
  maxWidth: theme.spacing(15),
  ...stackStyle(theme),
  marginTop: theme.spacing(5),
});
