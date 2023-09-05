import { render, screen } from '@testing-library/react';
import BarBtn from '../BarBtn';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('BatBtn', () => {
  it('renders correctly when isSelected is true', () => {
    const component = renderer.create(
      <BarBtn text="text" onClick={() => {}} isSelected={true} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when isSelected is false', () => {
    const component = renderer.create(
      <BarBtn text="text" onClick={() => {}} isSelected={false} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button clicked', async () => {
    const mockCallBack = jest.fn();

    render(<BarBtn text="text" onClick={mockCallBack} isSelected={true} />);

    const btn = screen.getByRole('button');

    await userEvent.click(btn);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
