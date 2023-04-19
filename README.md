# NotificationMS_FE

run npm install

<!-- For absolute imports -->
run npm install vite-tsconfig-paths --save-dev 
Now, inject vite-tsconfig-paths using the vite.config.ts module - 
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsconfigPaths()],
})


npm install react-router-dom
npm install bootstrap@5.3.0-alpha3