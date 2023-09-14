import renderer from 'react-test-renderer';
import CategoryBtn from '../CategoryBtn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CategoryBtn', () => {
  it('renders correctly when isSelected is true', () => {
    const component = renderer.create(
      <CategoryBtn text="text" onClick={() => {}} isSelected={true} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when isSelected is false', () => {
    const component = renderer.create(
      <CategoryBtn text="text" onClick={() => {}} isSelected={false} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is small', () => {
    const component = renderer.create(
      <CategoryBtn
        text="text"
        size="small"
        onClick={() => {}}
        isSelected={false}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is medium', () => {
    const component = renderer.create(
      <CategoryBtn
        text="text"
        size="medium"
        onClick={() => {}}
        isSelected={false}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when size is big', () => {
    const component = renderer.create(
      <CategoryBtn
        text="text"
        size="big"
        onClick={() => {}}
        isSelected={false}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('when button clicked', async () => {
    const mockCallback = jest.fn();

    render(
      <CategoryBtn text="text" onClick={mockCallback} isSelected={true} />
    );

    const btn = screen.getByRole('button');

    await userEvent.click(btn);
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});
