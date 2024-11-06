import React from "react";

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 z-50">
      <div className="w-12 h-12 rounded-full border-4 border-dotted border-white animate-[spin_5s_linear_infinite]"></div>
      <div className="mt-4 text-lg font-semibold text-white flex items-center">
        Loading
        <span className="inline-block ml-1 animate-[dots_2s_infinite] text-2xl leading-none">...</span>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dots {
          0%, 100% { content: '.'; }
          50% { content: '..'; }
        }
      `}</style>
    </div>
  );
};