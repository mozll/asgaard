import '../../styles.css'
import FooterMenu from './FooterMenu'
import React from 'react'

function Footer() {
    const navItems = [
        { link: '/games', title: 'Games' },
        { link: '/news', title: 'News' },
        { link: '/faq', title: 'FAQ' },
    ]
    return (
        <div className="">
            <FooterMenu navItems={navItems} />
            <div className="bg-qDark100">
                <p className="text-center my-8">
                    Platform Questzing by Andreas for Bachelor Project
                </p>
            </div>
        </div>
    )
}

export default Footer
