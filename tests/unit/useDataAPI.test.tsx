import 'whatwg-fetch';
import { renderHook, act } from '@testing-library/react-hooks';

import { server, rest } from '../utils/setupMSW';

import get from '../../src/api/common/get';

const url1 = 'https://test.com/url1';
const otherURL = 'https://test.com/other';

import useDataAPI from '../../src/api/common';

interface Title {
  id: number;
  title: string;
}

interface TitleListData {
  children: Title[];
}

describe('useDataAPI', () => {
  it('check we get the data correctly', async () => {
    server.use(
      rest.get(url1, (req, res, context) => {
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

    const result = await get<TitleListData>(url1);
    expect(result.parsedBody!.children.length).toBe(3);
  });

  it('check we get a failure correctly', async () => {
    server.use(
      rest.get(url1, (req, res, context) => {
        return res(context.status(404));
      })
    );

    await expect(get<TitleListData>(url1)).rejects.toThrow('404');
  });

  it('check we get a failure correctly', async () => {
    await expect(get<TitleListData>(otherURL)).rejects.toThrow('500');
  });

  it('alternative method to testing hooks', async () => {
    const testURL1 = url1 + '1';
    const testURL2 = url1 + '2';
    const testURL3 = url1 + '3';
    const responseData1 = {
      children: [
        {
          id: 1,
          title: 'one 1',
        },
        {
          id: 2,
          title: 'one1 2',
        },
        {
          id: 3,
          title: 'one1 3',
        },
        {
          id: 4,
          title: 'one1 4',
        },
      ],
    };
    const responseData2 = {
      children: [
        {
          id: 1,
          title: 'two 1',
        },
        {
          id: 2,
          title: 'two 2',
        },
        {
          id: 3,
          title: 'two 3',
        },
      ],
    };
    const responseData3 = {
      children: [
        {
          id: 1,
          title: 'three 1',
        },
        {
          id: 2,
          title: 'three 2',
        },
        {
          id: 3,
          title: 'three 3',
        },
        {
          id: 4,
          title: 'three 4',
        },
        {
          id: 5,
          title: 'three 5',
        },
      ],
    };

    // set up the MSW to return the JSON resposes when matched to the URLs
    server.use(
      rest.get(testURL1, (req, res, context) => {
        console.log(`🚀 MSW called with: ${testURL1}`);

        return res(context.status(200), context.json(responseData1));
      }),
      rest.get(testURL2, (req, res, context) => {
        console.log(`🚀 MSW called with: ${testURL2}`);

        return res(context.status(200), context.json(responseData2));
      }),
      rest.get(testURL3, (req, res, context) => {
        console.log(`🚀 MSW called with: ${testURL3}`);

        return res(context.status(200), context.json(responseData3));
      })
    );

    // react hook testing
    const { result, waitForNextUpdate } = renderHook(() =>
      useDataAPI('', null)
    );

    // check the values returned from hook
    expect(result.current[0].data).toBe(null);
    expect(result.current[0].isError).toBe(false);
    expect(result.current[0].isLoading).toBe(false);

    // the hook fetehes when the url changes
    const setURL = result.current[1];

    act(() => setURL(testURL1));
    await waitForNextUpdate();
    expect(result.current[0].data).not.toBeNull();
    expect((result.current[0].data as TitleListData).children.length).toBe(4);

    act(() => setURL(testURL2));
    await waitForNextUpdate();
    expect(result.current[0].data).not.toBeNull();
    expect((result.current[0].data as TitleListData).children.length).toBe(3);

    act(() => setURL(testURL3));
    await waitForNextUpdate();
    expect(result.current[0].data).not.toBeNull();
    expect((result.current[0].data as TitleListData).children.length).toBe(5);

    // const children = result.current[0].data as TitleListData;
    // console.log('THIS IS IT: ' + children.children[0]);

    //expect(result.current[0].data.children).toBe(3);
    // await result.current[0].isLoading;
    // await result.current[0].data;
  });
});
