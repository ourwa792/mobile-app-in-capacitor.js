import { defineConfig } from 'vite';
import { resolve } from "path"

export default defineConfig({
  root: './src',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      }
    } , 
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    commonjsOptions:{
      transformMixedEsModules: true,
    }
  },

  server: {
    // إذا كنت تعمل على Capacitor في بيئة محلية على هاتفك
    host: true, // تفعيل الوصول إلى السيرفر عبر IP المحلي
  },
});
