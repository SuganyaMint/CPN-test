import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// // import { reactRouter } from "@react-router/dev/vite";
// import { defineConfig } from "vite";
// // import tsconfigPaths from "vite-tsconfig-paths";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     // reactRouter(),
//     // tsconfigPaths(),
//   ],
// });