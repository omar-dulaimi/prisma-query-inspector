import React, { lazy, Suspense } from 'react';

const LazyNoMessages = lazy(() => import('./NoMessages'));

const NoMessages = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNoMessages {...props} />
  </Suspense>
);

export default NoMessages;
