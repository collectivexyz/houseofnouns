import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextInput } from './TextInput';

const CustomIcon = () => (
  <svg data-testid="custom-icon">
    <rect width="24" height="24" fill="red" />
  </svg>
);

describe('TextInput', () => {
  it('renders textbox', () => {
    render(<TextInput name="test" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a with a custom type & role', () => {
    render(<TextInput name="query" type="search" role="searchbox" />);
    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search');
  });

  it('renders with a disabled state', () => {
    render(<TextInput name="test" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders invalid input with error message', () => {
    render(<TextInput name="test" error="Field is required" />);
    expect(screen.getByRole('textbox')).toBeInvalid();
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('renders a custom icon on the left', () => {
    render(<TextInput name="test" iconLeft={<CustomIcon />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders a custom icon on the right', () => {
    render(<TextInput name="test" iconRight={<CustomIcon />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
