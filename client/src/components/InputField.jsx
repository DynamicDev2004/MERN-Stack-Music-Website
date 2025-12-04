import React, { use, useId } from "react";


function InputField({
  type,
  className,
  placeholder,
  ref,
  value,
  onChange= ()=>{},
  label,
  row=true,
  disabled = false,
  parentStyle,
  defaultValue,
  ...props
}) 
{
const uniqueId = useId()
  return (
    <>
    <div className={row? `flex gap-4 items-center justify-center ${parentStyle} p-1 w-full`: `flex flex-col gap-1 justify-center${parentStyle} p-1 w-full` }>
    <label htmlFor={uniqueId}  className="text-white text-xs font-extralight ">{label}</label>
      <input
        type={type? type : "text"}
        className={`${className} outline-0 text-white p-1 text-sm font-extralight px-3 rounded-lg border border-[#ffffff30] bg-[#ffffff15] w-full`}
        placeholder={placeholder}
        ref={ref}
        value={value}
        id={uniqueId}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        {...props}
      />
      </div>
    </>
  );
}

export default InputField;
