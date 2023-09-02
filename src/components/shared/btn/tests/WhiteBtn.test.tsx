import renderer from 'react-test-renderer';
import WhiteBtn from '../WhiteBtn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('BlueBtn2', () => {
  it('renders correctly when size is small', () => {
    const component = renderer.create(
      <WhiteBtn text="text" size="small" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is medium', () => {
    const component = renderer.create(
      <WhiteBtn text="text" size="medium" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is big', () => {
    const component = renderer.create(
      <WhiteBtn text="text" size="big" onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button clicked', async () => {
    const mockCallBack = jest.fn();

    render(<WhiteBtn text="text" onClick={mockCallBack} />);

    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
