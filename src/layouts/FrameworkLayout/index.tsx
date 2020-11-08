import * as React from 'react';
import BasicLayout from '../BasicLayout';
import UserLayout from '../UserLayout';

const { useEffect } = React;
export default function FrameworkLayout(props: {
  children: React.ReactNode;
  pathname: string;
  appLeave: { path: string };
  appEnter: { path: string };
}) {
  const { pathname, children, appLeave, appEnter } = props;
  const Layout = pathname === '/login' ? UserLayout : BasicLayout;
  useEffect(() => {
    console.log('== app leave ==', appLeave);
    if (appLeave.path === '/angular' && window.webpackJsonp) {
      // remove webpackJsonp added by Angular app
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      delete window.webpackJsonp;
    }
  }, [appLeave]);

  useEffect(() => {
    console.log('== app enter ==', appEnter);
  }, [appEnter]);

  return <Layout pathname={pathname}>{children}</Layout>;
}
