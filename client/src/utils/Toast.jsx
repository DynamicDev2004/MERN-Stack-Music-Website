import gsap from "gsap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../features/toastSlice";


function Toast() {

  const { type, message, heading } = useSelector((state) => state.toast);

  const dispatch = useDispatch();
  
const icons = {
  success: <i className="fi fi-rr-check mt-[2px] text-xs"></i>,
  error: <i className="fi fi-rr-cross mt-[2px] text-sm"></i>,
};

const colors = {
  success: "text-green-500",
  error: "text-red-500",
};

  useEffect(() => {
if(type == null || message == null || heading == null) return;
      gsap.to("#Toast", {
        top: 10,
                  opacity: 1,
      });

      setTimeout(() => {
        gsap.to("#Toast", {
          top: -150,
          opacity: 0,
          onComplete: ()=>dispatch(hideToast())
        });
      }, 3000);

  }, [message, type, heading]);
  



  return (
    <>
     <div
  className="absolute z-[9999999] -top-36 left-0 w-full flex justify-center items-center pointer-none"
  id="Toast"
>
  <div className="backdrop-blur-xl p-4 min-w-[160px] rounded-2xl border border-[var(--general-white)]/10 shadow-2xl relative">

    <span className={`flex gap-2 ${colors[type]}`}>
        
      {icons[type]}
      <h1 className="font-semibold text-sm 2xl:text-md">{heading}</h1>
    </span>
    <p className="text-xs text-[var(--general-white)]/60 mt-2">{message}</p>
  </div>
</div>

    </>
  );



}

export default Toast;
