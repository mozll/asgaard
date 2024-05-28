import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load environment variables
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react()],
        define: {
            'import.meta.env.VITE_QUESTZING_API_URL': JSON.stringify(
                env.VITE_QUESTZING_API_URL
            ),
        },
    }
})
