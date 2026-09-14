import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000", // 👈 Укажи свой порт
    setupNodeEvents(on, config) {
      // можно подключить плагины или обработчики
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // путь к тестам
    supportFile: "cypress/support/e2e.ts", // файл с глобальными хуками (если есть)
  },
});