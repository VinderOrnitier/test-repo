import React from 'react';
import { VButton } from "../../../../components"

interface IProps {
  title: string,
  subTitle: React.ReactElement,
  handleButton: () => void,
  buttonText: string,
}

const NotificationAlert = ({title = '', subTitle, buttonText = '', handleButton}: IProps) => {

  return (
    <div className="flex items-center border p-4">
      <div>
        <div className="text-white text-3xl font-bold">{title}</div>
        {subTitle}
      </div>
      <VButton onClick={handleButton} className="ml-auto">
        {buttonText}
      </VButton>
    </div>
  )
}

export default NotificationAlert;