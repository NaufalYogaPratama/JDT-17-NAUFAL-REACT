import React from 'react'

interface IButtonComponent {
  content: string;
  desc?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: IButtonComponent) => {
  return (
    <button className='bg-blue-500 text-white p-2 rounded-md' onClick={props.onClick}>{props.content}</button>
  )
}

export default Button