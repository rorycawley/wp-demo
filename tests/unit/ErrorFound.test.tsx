import * as React from 'react';
import ReactDOM from 'react-dom';

import ErrorFound from '../../src/components/Root/ErrorFound';

const container = document.createElement('div');

describe('<ErrorFound />', () => {
  beforeEach(() => {
  });
  
  it('renders without a provided error parameter', () => {
    const component = <ErrorFound data-testid='error-found-test' />;

    document.body.appendChild(container);

    ReactDOM.render(component, container);

    expect(container.textContent).toMatch('An error has occurred.');

    // console.log(container.innerHTML);
  });

  it('renders the component with an error message', () => {
    const errorMsg =
      "We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly.";
    const component = (
      <ErrorFound data-testid='error-found-test' error={errorMsg} />
    );

    document.body.appendChild(container);

    ReactDOM.render(component, container);

    expect(container.textContent).toMatch(errorMsg);

    // console.log(container.innerHTML);

    // screen.debug();
  });
});
