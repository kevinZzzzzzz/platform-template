import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";
import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量
  return defineConfig({
    plugins: [
      react(),
      federation({
        name: "remoteMain1",
        filename: "remoteEntry.js",
        remotes: {
          remoteMain: "http://192.168.120.178:8882/assets/remoteEntry.js",
        },
        exposes: {
          "./HomePage": "./src/pages/Home/index.tsx",
        },
        shared: { react: {}, "react-dom": {}, "react-router-dom": {} },
      }),
    ],
    // 打包配置
    build: {
      outDir: env.VITE_BASE_PATH,
      target: "esnext",
      minify: false, // boolean | 'terser' | 'esbuild'
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env": process.env,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern", "legacy"
          // additionalData: `@import "@/assets/styles/global.scss";`,
        },
      },
    },
    base: `/${env.VITE_BASE_PATH}`,
    preview: {
      port: 8884,
    },
    server: {
      port: 8883,
      host: true,
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false, // 解决代理https协议报错问题
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          rewrite: (path: any) => path.replace(/^\/api/, ""),
        },
        "/uaaApi": {
          target: env.VITE_BASE_URL_UAA,
          changeOrigin: true,
          secure: false, // 解决代理https协议报错问题
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          rewrite: (path: any) => path.replace(/^\/uaaApi/, ""),
        },
      },
    },
  });
};
