// page wrapper


import React, {Suspense} from 'react';

export default Page => props => (
  <Suspense fallback={<div>loading</div>}>
    <Page data-version="1.0.0" {...props} />
  </Suspense>
);
