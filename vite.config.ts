/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리에서 환경 변수를 로드합니다.
  // 세 번째 인자를 ''로 설정하면 VITE_ 접두사가 없는 변수(API_KEY 등)도 로드합니다.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // 브라우저 환경에서 process.env.API_KEY에 접근할 수 있도록 값을 치환합니다.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});