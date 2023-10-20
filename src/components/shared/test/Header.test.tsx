import renderer from 'react-test-renderer';
import Header from '../Header';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Header', () => {
  it('renders correctly when isLogin is false', () => {
    const component = renderer.create(
      <Header isLogin={false} notifications={[]} profileImageFilePath={undefined} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when isLogin is true', () => {
    const component = renderer.create(
      <Header isLogin={true} notifications={[]} profileImageFilePath={undefined} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
