import React from 'react'
import { Button as ShadcnButton } from "../ui/button";

interface IButtonComponent {
  content: string;
  desc?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: IButtonComponent) => {
  return (
    <ShadcnButton variant="secondary" className="w-fit mx-auto px-8 py-6 mb-4 rounded-full bg-slate-200 hover:bg-slate-300 text-red-black font-mono font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1" onClick={props.onClick}>{props.content}</ShadcnButton>
  )
}

export default Button