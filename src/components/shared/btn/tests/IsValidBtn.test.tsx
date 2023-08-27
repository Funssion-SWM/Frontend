import { render, screen } from '@testing-library/react';
import IsValidBtn from '../IsValidBtn';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('isValidBtn', () => {
  it('renders correctly when isValid is true', () => {
    const component = renderer.create(
      <IsValidBtn text={'text'} isValid={true} onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when isValid is false', () => {
    const component = renderer.create(
      <IsValidBtn text={'text'} isValid={false} onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button clicked', async () => {
    const mockCallBack = jest.fn();

    render(<IsValidBtn text="text" isValid={true} onClick={mockCallBack} />);

    const btn = screen.getByRole('button');

    await userEvent.click(btn);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
