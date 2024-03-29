import React from 'react';

type ErrorIconProps = {
  message: string;
};

const ErrorIconSVG = (
  props: React.SVGProps<SVGSVGElement> & ErrorIconProps
) => (
  <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 20 20'} {...props}>
    <title>{props.message}</title>
    <path
      fill="#d33"
      d={
        'M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z'
      }
    />
  </svg>
);

export default ErrorIconSVG;
