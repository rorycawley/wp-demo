import 'whatwg-fetch';
import React, { useState, useEffect } from 'react';

import get from '../../src/api/common/get';

import { waitFor, screen } from '@testing-library/react';

// import API mocking utilities from Mock Service Worker
import { server, rest } from '../utils/setupMSW';

import { waitForElementToBeRemoved } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { stringify } from '../utils/common';

const url1 = 'https://test.com/url1';
const otherURL = 'https://test.com/other';

interface Title {
  id: number;
  title: string;
}

interface TitleListData {
  children: Title[];
}

const todosURL = 'https://jsonplaceholder.typicode.com/todos/';

let container: any = null;

const Todo = () => {
  const [todos, setTodos] = useState<Title[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    get<TitleListData>(url1).then(response => {
      setTodos(response.parsedBody!.children);
      console.log(response.parsedBody!.children);
    });

    setIsLoading(false);
  }, []);

  return (
    <>
      {todos.length === 0 ? (
        <div data-testid='loading'>Loading</div>
      ) : (
        <div data-testid='root'>
          {todos.map(({ id, title }) => (
            <div key={id}>{title}</div>
          ))}
        </div>
      )}
    </>
  );
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/Loading/i),
      ...screen.queryAllByText(/Loading/i),
      ...screen.queryAllByTestId(/Loading/i),
    ],
    { timeout: 4500 }
  );

// describe('fetchData', () => {
it('renders Todo', async () => {
  server.use(
    rest.get(url1, (req, res, context) => {
      console.log('great fun altogether');
      return res(
        context.status(200),
        context.json({
          children: [
            {
              id: 1,
              title: 'foo1',
            },
            {
              id: 2,
              title: 'foo2',
            },
            {
              id: 3,
              title: 'foo3',
            },
          ],
        })
      );
    })
  );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    //   await waitForLoadingToFinish();
    render(<Todo />);
    // await waitForLoadingToFinish();
    await waitFor(() => screen.getByTestId('root'));
  });
  screen.debug();
});
