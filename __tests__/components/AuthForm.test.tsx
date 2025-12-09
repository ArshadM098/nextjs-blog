import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthForm, AuthFormData } from '@/components/AuthForm';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, onClick, type, disabled, ...props }: any) => (
      <button onClick={onClick} type={type} disabled={disabled} {...props}>
        {children}
      </button>
    ),
  },
}));

describe('AuthForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnToggleMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Mode', () => {
    it('renders login form with correct title', () => {
      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });

    it('does not show name field in login mode', () => {
      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(screen.queryByLabelText('Full Name')).not.toBeInTheDocument();
    });

    it('shows email and password fields', () => {
      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('displays Sign In button', () => {
      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    it('submits login form with email and password', async () => {
      mockOnSubmit.mockResolvedValue(true);

      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /Sign In/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: '',
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('shows error message on failed login', async () => {
      mockOnSubmit.mockResolvedValue(false);

      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /Sign In/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
      });
    });
  });

  describe('Signup Mode', () => {
    it('renders signup form with correct title', () => {
      render(
        <AuthForm
          mode="signup"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(screen.getByText('Join Us')).toBeInTheDocument();
    });

    it('shows name, email, and password fields', () => {
      render(
        <AuthForm
          mode="signup"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('displays Create Account button', () => {
      render(
        <AuthForm
          mode="signup"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(
        screen.getByRole('button', { name: /Create Account/i })
      ).toBeInTheDocument();
    });

    it('shows error message when email exists', async () => {
      mockOnSubmit.mockResolvedValue(false);

      render(
        <AuthForm
          mode="signup"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /Create Account/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });
    });
  });

  describe('Mode Toggle', () => {
    it('shows signup link in login mode', () => {
      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(
        screen.getByText("Don't have an account? Sign up")
      ).toBeInTheDocument();
    });

    it('shows login link in signup mode', () => {
      render(
        <AuthForm
          mode="signup"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      expect(
        screen.getByText('Already have an account? Sign in')
      ).toBeInTheDocument();
    });

    it('calls onToggleMode when toggle button is clicked', () => {
      render(
        <AuthForm
          mode="login"
          onSubmit={mockOnSubmit}
          onToggleMode={mockOnToggleMode}
        />
      );

      const toggleButton = screen.getByText("Don't have an account? Sign up");
      fireEvent.click(toggleButton);

      expect(mockOnToggleMode).toHaveBeenCalledTimes(1);
    });
  });
});
