import { Shell } from '@alifd/next';
import React from 'react';
import Footer from './components/Footer';
import PageNav from './components/PageNav';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webpackJsonp: any[];
  }
}

export default function BasicLayout(props: { children: React.ReactNode; pathname: string }) {
  const { children, pathname } = props;

  return (
    <Shell
      type='brand'
      style={{
        minHeight: '100vh'
      }}>
      <Shell.Branding>Framework</Shell.Branding>

      <Shell.Navigation>
        <PageNav pathname={pathname} />
      </Shell.Navigation>

      <Shell.Content>{children}</Shell.Content>
      <Shell.Footer>
        <Footer />
      </Shell.Footer>
    </Shell>
  );
}
