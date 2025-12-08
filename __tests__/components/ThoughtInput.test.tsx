import { render, screen, fireEvent } from '@testing-library/react';
import { ThoughtInput } from '@/components/ThoughtInput';
import { MAX_THOUGHT_LENGTH } from '@/types/thought';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, onClick, type, disabled, ...props }: any) => (
      <button onClick={onClick} type={type} disabled={disabled} {...props}>
        {children}
      </button>
    ),
  },
}));

describe('ThoughtInput', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders textarea and submit button', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText(/What shower thought/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Post Thought/i })).toBeInTheDocument();
  });

  it('updates character count as user types', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(screen.getByText(`${MAX_THOUGHT_LENGTH - 5} characters remaining`)).toBeInTheDocument();
  });

  it('disables submit button when input is empty', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Post Thought/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when input has text', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'A thought' } });

    const submitButton = screen.getByRole('button', { name: /Post Thought/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onSubmit with trimmed text when form is submitted', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByRole('textbox');
    const form = textarea.closest('form');

    fireEvent.change(textarea, { target: { value: '  A thought  ' } });
    fireEvent.submit(form!);

    expect(mockOnSubmit).toHaveBeenCalledWith('A thought');
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('clears input after successful submission', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'A thought' } });

    const form = textarea.closest('form');
    fireEvent.submit(form!);

    expect(textarea.value).toBe('');
  });

  it('disables submit when text exceeds max length', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByRole('textbox');
    const longText = 'a'.repeat(MAX_THOUGHT_LENGTH + 1);
    fireEvent.change(textarea, { target: { value: longText } });

    const submitButton = screen.getByRole('button', { name: /Post Thought/i });
    expect(submitButton).toBeDisabled();
  });

  it('does not submit when text is only whitespace', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByRole('textbox');
    const form = textarea.closest('form');

    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.submit(form!);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('has proper accessibility label on textarea', () => {
    render(<ThoughtInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByLabelText('Enter your shower thought');
    expect(textarea).toBeInTheDocument();
  });
});
