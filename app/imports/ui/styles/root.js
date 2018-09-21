const defaultRoot = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    // flex: 1,
    padding: theme.spacing.unit,
  },
});

const middleOfScreen = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacing.unit,
  },
});

export default { default: defaultRoot, middleOfScreen };
