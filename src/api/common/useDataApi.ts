import 'whatwg-fetch';
import React, { useState, useReducer, useEffect, Dispatch } from 'react';

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: unknown }
  | { type: 'FETCH_FAILURE' };

interface State {
  data: unknown;
  isLoading: boolean;
  isError: boolean;
}

const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error('Action not recognized in useDataApi dataFetchReducer');
  }
};

const useDataAPI = (
  initialURL: string,
  initialData: unknown
): [
  {
    data: unknown;
    isLoading: boolean;
    isError: boolean;
  },
  Dispatch<React.SetStateAction<string>>
] => {
  const [url, setUrl] = useState(initialURL);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    if (url !== '') {
      const abortController = new AbortController();
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });

        try {
          // console.info(`🚀fetching: ${url}`);
          const response = await window.fetch(url, {
            signal: abortController.signal,
          });
          const result = await response.json();
          // console.info('..response is: ' + JSON.stringify(result));

          if (!abortController.signal.aborted) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
          }
        } catch (error) {
          if (!abortController.signal.aborted) {
            dispatch({
              type: 'FETCH_FAILURE',
            });
          }
        }
      };

      fetchData();

      return () => {
        abortController.abort(); // cancel pending fetch request on component unmount
      };
    }
  }, [url]);

  return [state, setUrl];
};
export default useDataAPI;
