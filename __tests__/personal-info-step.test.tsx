import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonalInfoStep } from '@/components/application-form/personal-info-step';

describe('PersonalInfoStep', () => {
  const mockUpdateFormData = jest.fn();
  const defaultProps = {
    formData: {},
    updateFormData: mockUpdateFormData,
    errors: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all required fields', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    expect(screen.getByLabelText(/full legal name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/province/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/social insurance number/i)).toBeInTheDocument();
  });

  it('shows required field indicators', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    const requiredFields = screen.getAllByText('*');
    expect(requiredFields.length).toBeGreaterThan(0);
  });

  it('calls updateFormData when name field is changed', async () => {
    const user = userEvent.setup();
    render(<PersonalInfoStep {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/full legal name/i);
    await user.type(nameInput, 'John Doe');
    
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      fullName: 'J'
    });
  });

  it('calls updateFormData when email field is changed', async () => {
    const user = userEvent.setup();
    render(<PersonalInfoStep {...defaultProps} />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');
    
    expect(mockUpdateFormData).toHaveBeenCalledWith({
      email: 't'
    });
  });

  it('displays pre-filled form data', () => {
    const formData = {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-0123',
      streetAddress: '123 Main St',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3A8',
    };

    render(<PersonalInfoStep {...defaultProps} formData={formData} />);
    
    expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+1-555-0123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Toronto')).toBeInTheDocument();
    expect(screen.getByDisplayValue('M5V 3A8')).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const errors = {
      fullName: ['Full name is required'],
      email: ['Please enter a valid email address'],
      phone: ['Phone number is required'],
    };

    render(<PersonalInfoStep {...defaultProps} errors={errors} />);
    
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Phone number is required')).toBeInTheDocument();
  });

  it('has proper input validation attributes', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('has proper autocomplete attributes', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/full legal name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    const streetInput = screen.getByLabelText(/street address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const postalInput = screen.getByLabelText(/postal code/i);
    
    expect(nameInput).toHaveAttribute('autocomplete', 'name');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');
    expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
    expect(streetInput).toHaveAttribute('autocomplete', 'street-address');
    expect(cityInput).toHaveAttribute('autocomplete', 'address-level2');
    expect(postalInput).toHaveAttribute('autocomplete', 'postal-code');
  });

  it('enforces maximum length constraints', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/full legal name/i);
    const postalInput = screen.getByLabelText(/postal code/i);
    
    expect(nameInput).toHaveAttribute('maxlength', '100');
    expect(postalInput).toHaveAttribute('maxlength', '7');
  });

  it('shows helpful placeholder text', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('As shown on your ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('K1A 0A6')).toBeInTheDocument();
  });

  it('includes SIN security notice', () => {
    render(<PersonalInfoStep {...defaultProps} />);
    
    expect(screen.getByText(/your sin is required for tax reporting purposes/i)).toBeInTheDocument();
    expect(screen.getByText(/canada revenue agency/i)).toBeInTheDocument();
  });
});
