import { getList, hello } from '@/apis/lambda';
import { Link, useRequest } from 'ice';
import React, { useEffect } from 'react';

const Home = () => {
  const { data, loading, request } = useRequest(() => hello());
  const request2 = useRequest(() => getList());

  useEffect(() => {
    request();
  }, [request]);

  useEffect(() => {
    request2.request();
  }, []);

  return (
    <div>
      <h1>home page</h1>
      <div>
        <>请求函数结果：{loading ? 'loading....' : data?.message}</>
      </div>
      <div>
        <>请求函数结果：{loading ? 'loading....' : request2.data?.list[0].info}</>
      </div>
      <div>
        <Link to='/about'>About</Link>
      </div>
      <div>
        <Link to='/seller'>seller</Link>
      </div>
    </div>
  );
};

export default Home;
