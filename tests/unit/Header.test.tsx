import * as React from 'react';
import ReactDOM from 'react-dom';
import { render, RenderResult, screen } from '@testing-library/react';

import Header from '../../src/components/Root/Header';

const container = document.createElement('div');

describe('<Header />', () => {
  beforeEach(() => {
    // documentBody = render(
    //   <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    // );
  });

  it('renders the component', () => {
    const component = <Header data-testid='header-found-test' />;

    document.body.appendChild(container);

    ReactDOM.render(component, container);

    expect(container.textContent).toMatch('WP Reddit Demo');

    console.log(container.innerHTML);
  });
});
