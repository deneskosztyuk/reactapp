import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      __WEB3FORMS_ACCESS_KEY__: JSON.stringify(
        env.VITE_WEB3FORMS_ACCESS_KEY ?? env.REACT_APP_WEB3FORMS_ACCESS_KEY ?? ""
      ),
    },
  };
});
