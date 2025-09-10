import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FormField,
  canadianProvinces,
} from '@/components/application-form/form-elements';

describe('FormField Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders basic input field', () => {
    render(
      <FormField
        id='testField'
        label='Test Field'
        value=''
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <FormField
        id='testField'
        label='Test Field'
        value=''
        onChange={mockOnChange}
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <FormField
        id='testField'
        label='Test Field'
        value=''
        onChange={mockOnChange}
        placeholder='Enter text here'
      />
    );

    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('displays error message', () => {
    const errors = ['This field is required'];

    render(
      <FormField
        id='testField'
        label='Test Field'
        value=''
        onChange={mockOnChange}
        error={errors}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();

    render(
      <FormField
        id='testField'
        label='Test Field'
        value=''
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('renders email input type correctly', () => {
    render(
      <FormField
        id='email'
        label='Email'
        value=''
        onChange={mockOnChange}
        type='email'
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders with autocomplete attribute', () => {
    render(
      <FormField
        id='name'
        label='Name'
        value=''
        onChange={mockOnChange}
        autoComplete='name'
      />
    );

    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('autocomplete', 'name');
  });

  it('enforces maxLength attribute', () => {
    render(
      <FormField
        id='shortField'
        label='Short Field'
        value=''
        onChange={mockOnChange}
        maxLength={10}
      />
    );

    const input = screen.getByLabelText('Short Field');
    expect(input).toHaveAttribute('maxlength', '10');
  });
});

describe('Canadian Provinces', () => {
  it('includes all Canadian provinces and territories', () => {
    expect(canadianProvinces).toContainEqual({ value: 'ON', label: 'Ontario' });
    expect(canadianProvinces).toContainEqual({ value: 'QC', label: 'Quebec' });
    expect(canadianProvinces).toContainEqual({
      value: 'BC',
      label: 'British Columbia',
    });
    expect(canadianProvinces).toContainEqual({ value: 'AB', label: 'Alberta' });
    expect(canadianProvinces).toContainEqual({
      value: 'MB',
      label: 'Manitoba',
    });
    expect(canadianProvinces).toContainEqual({
      value: 'SK',
      label: 'Saskatchewan',
    });
    expect(canadianProvinces).toContainEqual({
      value: 'NS',
      label: 'Nova Scotia',
    });
    expect(canadianProvinces).toContainEqual({
      value: 'NB',
      label: 'New Brunswick',
    });
    expect(canadianProvinces).toContainEqual({
      value: 'NL',
      label: 'Newfoundland and Labrador',
    });
    expect(canadianProvinces).toContainEqual({
      value: 'PE',
      label: 'Prince Edward Island',
    });
    expect(canadianProvinces).toContainEqual({
      value: 'NT',
      label: 'Northwest Territories',
    });
    expect(canadianProvinces).toContainEqual({ value: 'NU', label: 'Nunavut' });
    expect(canadianProvinces).toContainEqual({ value: 'YT', label: 'Yukon' });
  });

  it('has the correct number of provinces and territories', () => {
    expect(canadianProvinces).toHaveLength(13);
  });
});
