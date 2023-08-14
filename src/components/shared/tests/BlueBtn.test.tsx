import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import BlueBtn from '../BlueBtn';
import userEvent from '@testing-library/user-event';

describe('Blue Btn', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <BlueBtn text="text" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button clicked', async () => {
    const mockCallBack = jest.fn();

    render(<BlueBtn text="text" onClick={mockCallBack} />);

    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
