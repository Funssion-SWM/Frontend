import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import BlueBtn from '../BlueBtn';
import userEvent from '@testing-library/user-event';

describe('Blue Btn', () => {
  it('renders correctly when size is small', () => {
    const component = renderer.create(
      <BlueBtn text="text" size="small" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is medium', () => {
    const component = renderer.create(
      <BlueBtn text="text" size="medium" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is big', () => {
    const component = renderer.create(
      <BlueBtn text="text" size="big" onClick={() => {}} />
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
