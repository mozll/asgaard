import React, { useEffect, useState } from 'react'
import '../styles.css' // Import your global styles

// other imports and components

interface Test {
    user_name: string
    user_id: number
    user_email: string
}

function HomePage() {
    return (
        <div>
            <h1 className="font-bold text-red-500">THIS IS HOME PAGE</h1>
        </div>
    )
}

export default HomePage
