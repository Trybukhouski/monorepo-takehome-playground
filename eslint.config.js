import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(
  // Игнорируем системные папки и сборки всех подпроектов
  {
    ignores: ['**/dist/**', '**/.next/**', '**/node_modules/**', '**/out/**'],
  },

  // Базовые правила для JS и TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Настройки для всех файлов
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Интеграция Prettier: ESLint будет ругаться, если код не отформатирован по правилам Prettier
      'prettier/prettier': 'error',

      // Полезные правила для чистоты кода
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Предупреждать о забытых console.log
      'no-unused-vars': 'off', // Отключаем базовый, так как TS-линтер делает это лучше
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ругаться на неиспользуемые переменные (кроме тех, что с нижнего подчеркивания)
      '@typescript-eslint/no-explicit-any': 'warn', // Предупреждать, если везде пихаешь `any`
      'prefer-const': 'error', // Если переменная не меняется, заставлять использовать const
    },
  },

  // Отключаем правила линтера, которые могут конфликтовать с форматированием Prettier
  eslintConfigPrettier,
);
