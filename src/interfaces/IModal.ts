import React from 'react';
export default interface IModal {
  children: React.ReactNode;
  className?: string;
  title?: string;
  visible?: boolean;
  // setVisible?: (visible: boolean) => void,
  setVisible?: any;
}
