import React from 'react';

const CloseIconSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 36 36'} {...props}>
    <title>Close</title>
    <path
      fill={'currentColor'}
      d={
        'M19.41 18l7.29-7.29a1 1 0 0 0-1.41-1.41L18 16.59l-7.29-7.3A1 1 0 0 0 9.3 10.7l7.29 7.3l-7.3 7.29a1 1 0 1 0 1.41 1.41l7.3-7.29l7.29 7.29a1 1 0 0 0 1.41-1.41z'
      }
    />
  </svg>
);

export default CloseIconSVG;
