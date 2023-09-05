import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it('login input has properties correctly', () => {
    const emailInput = screen.getByPlaceholderText('이메일');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(emailInput).toHaveAttribute('name', 'email');
  });

  it('password input has properties correctly', () => {
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('id', 'pw');
    expect(passwordInput).toHaveAttribute('name', 'pw');
  });

  it('update input value when typing', () => {
    const emailInput = screen.getByPlaceholderText(
      '이메일'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      '비밀번호'
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'abc123@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abc123' } });

    expect(emailInput.value).toBe('abc123@gmail.com');
    expect(passwordInput.value).toBe('abc123');
  });

  // it('sumbit', () => {
  //   const mockSubmit = jest.fn();

  //   render(<LoginForm />);

  //   const form = screen.getByRole('form');
  //   form.onsubmit = mockSubmit;
  //   // const btn = screen.getByRole('button');
  //   const emailInput = screen.getByPlaceholderText('이메일');
  //   const passwordInput = screen.getByPlaceholderText('비밀번호');

  //   userEvent.type(emailInput, 'test@example.com');
  //   userEvent.type(passwordInput, 'password123');
  //   fireEvent.submit(form);
  //   // userEvent.click(btn);

  //   expect(mockSubmit).toHaveBeenCalledTimes(1);
  // });
});
