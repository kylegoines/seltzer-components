import { defineConfig } from 'vite'
import path from 'path'

// dont forget to update the exports with this name in the package json!
const PROJECT_NAME = 'seltzer-components'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),
            name: PROJECT_NAME,
            fileName: (format) => `${PROJECT_NAME}.${format}.js`,
        },
    },
})
