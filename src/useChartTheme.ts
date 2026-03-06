import { useTheme } from './ThemeContext';

export const useChartTheme = () => {
  const { theme } = useTheme();
  return {
    gridColor: theme === 'dark' ? '#1E293B' : '#E2E8F0',
    axisColor: theme === 'dark' ? '#94A3B8' : '#475569',
    tooltipStyle: {
      backgroundColor: theme === 'dark' ? '#1A2332' : '#FFFFFF',
      border: `1px solid ${theme === 'dark' ? '#334155' : '#D1D5DB'}`,
      borderRadius: '8px',
      fontSize: '13px',
      fontFamily: 'Heebo',
      color: theme === 'dark' ? '#E2E8F0' : '#0F172A',
    },
    labelColor: theme === 'dark' ? '#CBD5E1' : '#334155',
  };
};
