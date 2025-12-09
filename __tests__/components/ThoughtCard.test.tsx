import { render, screen, fireEvent } from '@testing-library/react';
import { ThoughtCard } from '@/components/ThoughtCard';
import { ShowerThought } from '@/types/thought';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

describe('ThoughtCard', () => {
  const mockThought: ShowerThought = {
    id: '1',
    text: 'If you wait for the waiter, aren\'t you the waiter?',
    createdAt: new Date('2024-01-01T12:00:00'),
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the thought text', () => {
    render(<ThoughtCard thought={mockThought} onDelete={mockOnDelete} />);

    expect(screen.getByText(mockThought.text)).toBeInTheDocument();
  });

  it('displays relative time', () => {
    render(<ThoughtCard thought={mockThought} onDelete={mockOnDelete} />);

    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<ThoughtCard thought={mockThought} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByLabelText('Delete thought');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('formats recent time as "just now"', () => {
    const recentThought = {
      ...mockThought,
      createdAt: new Date(),
    };

    render(<ThoughtCard thought={recentThought} onDelete={mockOnDelete} />);

    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  it('has proper accessibility attributes on time element', () => {
    render(<ThoughtCard thought={mockThought} onDelete={mockOnDelete} />);

    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveAttribute('dateTime');
  });
});
