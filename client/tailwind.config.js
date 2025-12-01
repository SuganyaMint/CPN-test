// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         thai: ['Noto Sans Thai', 'sans-serif'],
//         thai2: ['Sarabun', 'sans-serif'],
//         thai3: ['Kanit', 'sans-serif'],
//         thai4: ['Mitr', 'sans-serif'],
//         thai5: ['Pridi', 'serif'],
//         thai6: ['Chakra Petch', 'sans-serif'],
//         thai7: ['IBM Plex Sans Thai', 'sans-serif'],

//       },
//       colors: {
//         colorsV1: '#E4E0E1',
//         colorsV2: '#1ce3f0',
//         colorsV3: '#0097b2',
//         colorsV4: '#155f6c', 
//         errortext: '#fd5c5c',
//         successtext: '#3fa769',
//         inprocesstext: '#eabf11'

//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ⭐ เพิ่มฟอนต์ Prompt สำหรับใช้ทั้งเว็บ
        prompt: ['Prompt', 'sans-serif'],
        // ถ้าอยากให้หัวข้อเป็น Prompt และเนื้อหาเป็น Sarabun:
        // sarabun: ['Sarabun', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}