import renderer from 'react-test-renderer';
import ColorCricle from '../ColorCircle';
import { mock } from 'node:test';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ColorCircle', () => {
  it('renders correctly when selected', () => {
    const component = renderer.create(
      <ColorCricle color={'yellow'} selected={'yellow'} onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when not selected', () => {
    const component = renderer.create(
      <ColorCricle color={'yellow'} selected={'green'} onClick={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('clicks correctly', async () => {
    const mockCallBack = mock.fn();

    render(
      <ColorCricle
        color={'yellow'}
        selected={'yellow'}
        onClick={mockCallBack}
      />
    );

    const circle = screen.getByText('✓');
    await userEvent.click(circle);

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
