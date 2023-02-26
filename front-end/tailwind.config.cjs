/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        Helvetica:["Helvetica","sans-serif"],
      },
      colors:{
        "primary-green" : "#00a884",
        "primary-light-gray" : "#f0f2f5",
        "primary-dark-gray" :"#54656f",
        "sec-light-green" :"#dbf8c6",
      },
      stroke:{
        8:"8px"
      },
      fontSize:{
        mySm : ['0.85rem','1rem'],
        myMd : ['1rem','1.2rem'],
      },
      fontWeight:{
        myMedium: 470,
      },
      height:{
        vh85:"85vh"
      },
    },
  },
  plugins: [],
}
