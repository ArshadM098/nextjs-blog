import { render, screen, fireEvent } from '@testing-library/react';
import { UserAvatar } from '@/components/UserAvatar';

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

describe('UserAvatar', () => {
  it('renders initials correctly', () => {
    render(<UserAvatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies correct size class for small size', () => {
    const { container } = render(<UserAvatar initials="AB" size="sm" />);
    const element = container.querySelector('.w-8');
    expect(element).toBeInTheDocument();
  });

  it('applies correct size class for medium size', () => {
    const { container } = render(<UserAvatar initials="CD" size="md" />);
    const element = container.querySelector('.w-10');
    expect(element).toBeInTheDocument();
  });

  it('applies correct size class for large size', () => {
    const { container } = render(<UserAvatar initials="EF" size="lg" />);
    const element = container.querySelector('.w-12');
    expect(element).toBeInTheDocument();
  });

  it('renders as button when onClick is provided', () => {
    const handleClick = jest.fn();
    render(<UserAvatar initials="GH" onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<UserAvatar initials="IJ" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as div when onClick is not provided', () => {
    const { container } = render(<UserAvatar initials="KL" />);
    const button = screen.queryByRole('button');
    const div = container.querySelector('div');

    expect(button).not.toBeInTheDocument();
    expect(div).toBeInTheDocument();
  });

  it('has proper accessibility label when clickable', () => {
    render(<UserAvatar initials="MN" onClick={() => {}} />);
    const button = screen.getByLabelText('Open menu');
    expect(button).toBeInTheDocument();
  });

  it('has proper accessibility label when not clickable', () => {
    render(<UserAvatar initials="OP" />);
    const element = screen.getByLabelText('User avatar');
    expect(element).toBeInTheDocument();
  });
});
