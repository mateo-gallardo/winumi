import React from 'react';

const MinimizeIconSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 36 36'} {...props}>
    <title>Minimize</title>
    <path
      fill={'currentColor'}
      d={'M27 27H9a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z'}
    />
  </svg>
);

export default MinimizeIconSVG;
