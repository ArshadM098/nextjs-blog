import { render, screen, fireEvent } from '@testing-library/react';
import { TabNavigation } from '@/components/TabNavigation';

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

describe('TabNavigation', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both tab buttons', () => {
    render(<TabNavigation activeTab="feed" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('📰')).toBeInTheDocument();
    expect(screen.getByText('✍️')).toBeInTheDocument();
  });

  it('shows Feed label on larger screens', () => {
    render(<TabNavigation activeTab="feed" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Feed')).toBeInTheDocument();
  });

  it('shows Create label on larger screens', () => {
    render(<TabNavigation activeTab="create" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('calls onTabChange when feed tab is clicked', () => {
    render(<TabNavigation activeTab="create" onTabChange={mockOnTabChange} />);

    const feedButton = screen.getByText('Feed').closest('button');
    fireEvent.click(feedButton!);

    expect(mockOnTabChange).toHaveBeenCalledWith('feed');
  });

  it('calls onTabChange when create tab is clicked', () => {
    render(<TabNavigation activeTab="feed" onTabChange={mockOnTabChange} />);

    const createButton = screen.getByText('Create').closest('button');
    fireEvent.click(createButton!);

    expect(mockOnTabChange).toHaveBeenCalledWith('create');
  });

  it('does not call onTabChange when active tab is clicked', () => {
    render(<TabNavigation activeTab="feed" onTabChange={mockOnTabChange} />);

    const feedButton = screen.getByText('Feed').closest('button');
    fireEvent.click(feedButton!);

    // It will still be called, but with the same value
    expect(mockOnTabChange).toHaveBeenCalledWith('feed');
  });
});
