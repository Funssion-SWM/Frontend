import { render, screen } from '@testing-library/react';
import BlueBtn from '../BlueBtn';
import userEvent from '@testing-library/user-event';

describe('Blue Btn', () => {
  const text = '등록';

  it('renders button text', () => {
    render(<BlueBtn text={text} onClick={() => {}} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('when clicked button', async () => {
    const mockCallBack = jest.fn();

    render(<BlueBtn text={text} onClick={mockCallBack} />);

    const btn = screen.getByRole('button');

    await userEvent.click(btn);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
