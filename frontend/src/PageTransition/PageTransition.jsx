import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

export default function PageTransition({ children }) {
    const location = useLocation()
    const [displayChildren, setDisplayChildren] = useState(children)
    const [stage, setStage] = useState('enter')

    useEffect(() => {
        setStage('exit')
        const t = setTimeout(() => {
            setDisplayChildren(children)
            setStage('enter')
        }, 250)
        return () => clearTimeout(t)
    }, [location.pathname])

    return (
        <div className={`page-transition ${stage}`}>
            {displayChildren}
        </div>
    )
}