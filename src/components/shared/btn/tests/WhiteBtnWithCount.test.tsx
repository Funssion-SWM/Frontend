import { render, screen } from '@testing-library/react';
import WhiteBtnWithCount from '../WhiteBtnWithCount';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('WhiteBtnWithCount', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <WhiteBtnWithCount
        text="text"
        count={0}
        onClickBtn={() => {}}
        onClickCount={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button or count is clicked', async () => {
    const mockBtnFunction = jest.fn();
    const mockCountFunction = jest.fn();

    render(
      <WhiteBtnWithCount
        text="text"
        count={0}
        onClickBtn={mockBtnFunction}
        onClickCount={mockCountFunction}
      />
    );

    const [btn, count] = screen.getAllByRole('button');

    await userEvent.click(btn);
    expect(mockBtnFunction).toHaveBeenCalledTimes(1);

    await userEvent.click(count);
    expect(mockCountFunction).toHaveBeenCalledTimes(1);
  });
});
