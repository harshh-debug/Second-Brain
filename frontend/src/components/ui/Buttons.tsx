import type { ReactElement } from "react"

interface ButtonProps{
    text:String,
    variant:"primary"|"secondary"
    size:"sm"|"md"|"lg",
    startIcon?:ReactElement,
    endIcon?:ReactElement
    onclick:()=>void
}

const variantStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-500"
}

const sizeStyles={
  "sm": "py-1 px-2",
  "md":"py-2 px-4",
  "lg":"py-4 px-6"
}


const defaultStyle="rounded-md p-4 flex"

const Button = (props:ButtonProps) => {
  
  return (
    <button className={`${variantStyles[props.variant]} ${defaultStyle} ${sizeStyles[props.size]}`}>
      {props.startIcon}  {props.text} {props.endIcon}
    </button>
  )
}

export default Button
