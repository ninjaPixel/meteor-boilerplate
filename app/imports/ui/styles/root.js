import { SPACING } from './constants';

export const defaultRootStyle = (theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  width: '100%',
  padding: SPACING['16'],
});

export const topCenterStyle = (theme) => ({
  ...defaultRootStyle(theme),
  alignItems: 'center',
});

export const middleOfScreenStyle = (theme) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  padding: SPACING['16'],
});
