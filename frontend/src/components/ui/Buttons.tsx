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
    "primary":"bg-purple-600 text white",
    "secondary":"bg-purple-400 text-purple-500"

}

const defaultStyle="rounded-md p-4"

const Button = (props:ButtonProps) => {
  
  return (
    <button className={variantStyles[props.variant]}>
        {props.text}
    </button>
  )
}

export default Button
