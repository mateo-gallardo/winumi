export interface ZoomLevel {
  displayValue: string;
  fontSize: string;
}

const ZoomLevels: ZoomLevel[] = [
  {
    displayValue: '50%',
    fontSize: '8px',
  },
  {
    displayValue: '75%',
    fontSize: '12px',
  },
  {
    displayValue: '100%',
    fontSize: '16px',
  },
  {
    displayValue: '125%',
    fontSize: '20px',
  },
  {
    displayValue: '150%',
    fontSize: '24px',
  },
  {
    displayValue: '175%',
    fontSize: '28px',
  },
  {
    displayValue: '200%',
    fontSize: '32px',
  },
];

export default ZoomLevels;
