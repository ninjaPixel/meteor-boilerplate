export const defaultRootStyle = theme => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  // flex: 1,
  padding: theme.spacing.unit * 2,
});

export const middleOfScreenStyle = theme => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing.unit * 2,
});
