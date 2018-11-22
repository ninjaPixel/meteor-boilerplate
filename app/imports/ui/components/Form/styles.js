export default (theme) => ({
  rootColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  rootRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
  },
  textField: {
    // width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit * 10,
    width: '100%',
  },
  switchLabelContainer: {},
  switchFormGroup: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {},
  starIcon: {
    fontSize: '3rem',
  },
  genericFormLabel: {
    color: theme.palette.text.secondary,
    fontSize: '0.79rem',
  },
  flex1: {
    flex: 1,
  },
  flex3: {
    flex: 3,
  },
});
