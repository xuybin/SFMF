/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/rules-of-hooks */

export async function hello() {
  return {
    message: 'Hello ICE & Midway Serverless & Aliyun!'
  };
}
export async function getList() {
  return {
    list: [
      {
        name: '@midwayjs/faas-cli',
        info: 'FaaS 本地研发工具包'
      },
      {
        name: '@midwayjs/faas',
        info: '函数IoC框架'
      },
      {
        name: '@midwayjs/runtime-engine',
        info: '函数运行时引擎'
      }
    ]
  };
}

export async function sendMessage(message: string, i: number) {
  return {
    answer: `Your message is ${message}-${i}`,
    method: 'post'
  };
}
