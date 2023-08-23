import renderer from 'react-test-renderer';
import BlueBtn2 from '../btn/BlueBtn2';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('BlueBtn2', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <BlueBtn2 text="text" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button clicked', async () => {
    const mockCallBack = jest.fn();

    render(<BlueBtn2 text="text" onClick={mockCallBack} />);

    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
