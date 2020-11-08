import { sendMessage } from '@/apis/lambda';
import { Link, useRequest } from 'ice';
import React, { useEffect } from 'react';

const About = () => {
  const { data, loading, request } = useRequest(() => sendMessage('abc', 123));

  useEffect(() => {
    request();
  }, [request]);

  return (
    <div>
      <h1>About page</h1>
      <div>
        <>请求函数结果：{loading ? 'loading....' : data?.answer}</>
      </div>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/seller/list'>sellerlist</Link>
      </div>
    </div>
  );
};

export default About;
