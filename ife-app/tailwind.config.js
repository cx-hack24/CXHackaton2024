/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundClip: ['text'],
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        se: "375px",
        //iphone SE

        xr: "414px",
        //iphone XR

        pro: "390px",
        // iph 12 pro

        pix: "393px",
        // pixel

        sg: "360px",
        // samsung galaxy

        su: "412px", 
        // samsung ultra

        gf: "280px",
        // galaxy fold
        
        a51: "412px",
        // samsung a51

        ss: "361px",
        // => @media (min-width: 640px) { ... }

        fs: "200px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        jade: "#006564",
        white: "#FFFFFF",
        mediumjade: "#367D79",
        lightjade: "#5E967E",
        sand: "#C1B49A",
        lightsand: "#DCD3BC",
        slate: "#C6C2C1",
        lightslate:"#EBEDEC",
        saffron: "#C2262E",
        black: "#000000",
        gray: "#666666",
        lightgray: "#e0e0e0",
      },
    },
  },
  plugins: [],
}