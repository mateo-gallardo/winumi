import React from 'react';

const MaximizeIconSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 36 36'} {...props}>
    <title>Maximize</title>
    <path
      fill={'currentColor'}
      d={
        'M27.89 9h-20a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2zm-20 16V11h20v14z'
      }
    />
  </svg>
);

export default MaximizeIconSVG;
