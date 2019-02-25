import { SPACING } from './constants';

export const linkStyle = (theme) => ({
  cursor: 'pointer',
  color: theme.palette.secondary.main,
});

export const buttonStyle = (theme) => ({
  marginTop: SPACING['16'],
  minWidth: 110,
  width: '100%',
});

export const paperStyle = (theme) => ({
  padding: `${SPACING['16']}px ${SPACING['32']}px ${SPACING['32']}px ${SPACING['24']}px`,
});

export const inputStyle = (theme) => ({
  width: '100%',
});

export const responsivePaperTitleStyle = (theme) => ({
  marginBottom: SPACING['8'],
});
