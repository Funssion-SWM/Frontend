import renderer from 'react-test-renderer';
import GoogleLoginBtn from '../GoogleLoginBtn';

describe('GoogleLoginBtn', () => {
  it('renders correctly', () => {
    const component = renderer.create(<GoogleLoginBtn />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
