import React from "react";

export default function Entertainmentcard({ title, icon: Icon, image, href }) {

    const handleClick = (e) => {
        e.preventDefault();
        const category = title.toLowerCase();
        localStorage.setItem('selectedCategory', category);
        document.dispatchEvent(new Event('startTransition'));
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    };

    return(
        <div className="relative w-[400px] h-[325px] mx-3 rounded-lg overflow-hidden group shadow-[0_6px_8px_rgba(0,0,0,0.45)] active:shadow-none transition-shadow duration-150 cursor-pointer">
            <div 
                className="w-full h-full"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black opacity-40"/>
                
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                    <Icon className="text-white text-[64px] mb-4"/>
                    <div className="text-white font-medium text-[24px]">
                        {title}
                    </div>
                </div>
            </div>
            
            <a 
                href={href}
                onClick={handleClick}
                className="absolute w-full h-full inset-0 z-10"
                aria-label={title}
            />
        </div>
    );
}