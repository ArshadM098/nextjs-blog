import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ThemeProvider } from '@/lib/theme-context';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('ThemeSelector', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('renders all theme buttons', () => {
    renderWithTheme(<ThemeSelector />);

    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Sunset')).toBeInTheDocument();
    expect(screen.getByText('Midnight')).toBeInTheDocument();
  });

  it('displays theme icons', () => {
    renderWithTheme(<ThemeSelector />);

    expect(screen.getByText('☀️')).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
    expect(screen.getByText('🌅')).toBeInTheDocument();
    expect(screen.getByText('🌌')).toBeInTheDocument();
  });

  it('marks the current theme as active', () => {
    renderWithTheme(<ThemeSelector />);

    const lightButton = screen.getByLabelText('Switch to Light theme');
    expect(lightButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('switches theme when button is clicked', () => {
    renderWithTheme(<ThemeSelector />);

    const darkButton = screen.getByLabelText('Switch to Dark theme');
    fireEvent.click(darkButton);

    expect(darkButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<ThemeSelector />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('aria-pressed');
    });
  });
});
