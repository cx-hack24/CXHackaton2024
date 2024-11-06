import React from "react";

export const Buttonfull = ({ url, text }) => {

  return (
    <div className="flex justify-center w-[160px] h-[37px] bg-jade rounded-[8px] font-medium text-white text-[16px] shadow-lg active:shadow-none cursor:pointer">
      <a className=" w-full h-full flex items-center justify-center" href={url}>
        <div>{text}</div>
      </a>
    </div>
  );
};

export const ButtonSecond = ({ url, text }) => {
  return (
    <button className="w-[160px] h-[37px] bg-white border-2 border-lightjade rounded-[8px] font-medium text-mediumjade text-[16px] shadow-lg active:shadow-none" onClick={onclick}>
      <a className=" w-full h-full flex items-center justify-center" href={url}>
        <div>{text}</div>
      </a>
    </button>
  );
};

export const LanguageToggle = ({ onClick }) => {
  // Using checkbox, if not checked, english. Else, chinese.
  return (
    <label className="relative flex justify-center items-center w-[80px] h-[40px] rounded-[40px] cursor-pointer peer">
      <input type="checkbox" className="sr-only peer" onClick={onClick} />
      <div className="absolute bg-transparent border-2 border-white inset-0  duration-100 rounded-[40px]"></div>
      <div className="absolute left-[2px] top-[2px] bg-white rounded-[40px] h-[36px] w-[36px] transition-transform duration-200 transform peer-checked:translate-x-[40px] z-0"></div>
      <span className="flex flex-col justify-center z-10 px-[9.5px] relative text-[12px] font-semibold peer-checked:text-white">
        Eng 
      </span>
      <span className="flex flex-col justify-center z-10 px-[13.5px] relative text-white text-[13px] font-semibold peer-checked:text-black">
        文
      </span>
    </label>
  );
};