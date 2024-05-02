import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GamesList from '../src/components/GamesList.tsx'
import GenresList from './components/GenresList.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <GamesList />
        <GenresList />
    </React.StrictMode>
)
