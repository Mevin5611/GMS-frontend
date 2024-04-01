/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#1aac83',
        logoclr :'#eea32e',
        logoclr300 :'#f7d194'
      },
      width:{
        wx500:'400px',
        wx600:'500px',
        winput:'350px',
        wx340:'340px'
      },
      height:{
        hx300:'300px',
        hx500:'500px'
      }
      
    },
  },
  plugins: [],
}