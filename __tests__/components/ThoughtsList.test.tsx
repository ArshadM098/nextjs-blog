import { render, screen } from '@testing-library/react';
import { ThoughtsList } from '@/components/ThoughtsList';
import { ShowerThought } from '@/types/thought';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock ThoughtCard component
jest.mock('@/components/ThoughtCard', () => ({
  ThoughtCard: ({ thought, onDelete }: any) => (
    <div data-testid={`thought-${thought.id}`}>
      <p>{thought.text}</p>
      <button onClick={() => onDelete(thought.id)}>Delete</button>
    </div>
  ),
}));

describe('ThoughtsList', () => {
  const mockThoughts: ShowerThought[] = [
    {
      id: '1',
      text: 'First thought',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      text: 'Second thought',
      createdAt: new Date('2024-01-02'),
    },
  ];

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no thoughts exist', () => {
    render(<ThoughtsList thoughts={[]} onDelete={mockOnDelete} />);

    expect(screen.getByText('No thoughts yet')).toBeInTheDocument();
    expect(screen.getByText('Share your first shower thought above!')).toBeInTheDocument();
  });

  it('renders all thoughts when thoughts exist', () => {
    render(<ThoughtsList thoughts={mockThoughts} onDelete={mockOnDelete} />);

    expect(screen.getByText('First thought')).toBeInTheDocument();
    expect(screen.getByText('Second thought')).toBeInTheDocument();
  });

  it('renders correct number of thought cards', () => {
    render(<ThoughtsList thoughts={mockThoughts} onDelete={mockOnDelete} />);

    expect(screen.getByTestId('thought-1')).toBeInTheDocument();
    expect(screen.getByTestId('thought-2')).toBeInTheDocument();
  });

  it('does not render empty state when thoughts exist', () => {
    render(<ThoughtsList thoughts={mockThoughts} onDelete={mockOnDelete} />);

    expect(screen.queryByText('No thoughts yet')).not.toBeInTheDocument();
  });

  it('passes onDelete handler to thought cards', () => {
    render(<ThoughtsList thoughts={mockThoughts} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(2);
  });
});
