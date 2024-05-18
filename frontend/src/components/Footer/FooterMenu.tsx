import { NavLink } from 'react-router-dom'
import '../../styles.css'
import React from 'react'

interface NavItems {
    link: string
    title: string
}

interface FooterMenuProps {
    navItems: NavItems[]
}

const FooterMenu = ({ navItems }: FooterMenuProps) => {
    return (
        <div className="flex justify-center mt-8 p-8 bg-qDark200">
            <nav className="flex gap-8 text-lg">
                {navItems.map((navItem, index) => (
                    <NavLink key={index} to={navItem.link}>
                        {navItem.title}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}

export default FooterMenu
