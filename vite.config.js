import { defineConfig } from 'vite';  
import react from '@vitejs/plugin-react';  

export default defineConfig({  
  plugins: [react()],  
  test: {  
    environment: 'happy-dom',
    globals: true, 
    setupFiles: ['./tests/setup.js'],
  },  
}); 