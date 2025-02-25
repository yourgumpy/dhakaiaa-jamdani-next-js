import Link from 'next/link'
import React from 'react'

const Breadcrumbs = ({category, title}:{category:String, title:String}) => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link href="/Shop">Shop</Link></li>
                    <li>{category}</li>
                    <li>{title}</li>
                </ul>
            </div>
        </div>
    )
}

export default Breadcrumbs
