export type Theme = 'light' | 'dark' | 'sunset' | 'midnight';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    card: '#F9FAFB',
    cardForeground: '#0A0A0A',
    primary: '#3B82F6',
    primaryForeground: '#FFFFFF',
    secondary: '#F3F4F6',
    secondaryForeground: '#1F2937',
    muted: '#F9FAFB',
    mutedForeground: '#6B7280',
    accent: '#DBEAFE',
    accentForeground: '#1E40AF',
    border: '#E5E7EB',
  },
  dark: {
    background: '#0A0A0A',
    foreground: '#FAFAFA',
    card: '#171717',
    cardForeground: '#FAFAFA',
    primary: '#60A5FA',
    primaryForeground: '#0A0A0A',
    secondary: '#262626',
    secondaryForeground: '#E5E5E5',
    muted: '#171717',
    mutedForeground: '#A3A3A3',
    accent: '#1E3A8A',
    accentForeground: '#BFDBFE',
    border: '#262626',
  },
  sunset: {
    background: '#FFF5F0',
    foreground: '#431407',
    card: '#FED7C3',
    cardForeground: '#7C2D12',
    primary: '#EA580C',
    primaryForeground: '#FFFFFF',
    secondary: '#FFEDD5',
    secondaryForeground: '#9A3412',
    muted: '#FED7C3',
    mutedForeground: '#C2410C',
    accent: '#FB923C',
    accentForeground: '#431407',
    border: '#FDBA74',
  },
  midnight: {
    background: '#0F172A',
    foreground: '#E2E8F0',
    card: '#1E293B',
    cardForeground: '#E2E8F0',
    primary: '#818CF8',
    primaryForeground: '#0F172A',
    secondary: '#334155',
    secondaryForeground: '#CBD5E1',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    accent: '#4F46E5',
    accentForeground: '#E0E7FF',
    border: '#334155',
  },
};
