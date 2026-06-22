import { useEffect, useRef, useState } from 'react'

function formatarNome(name) {
    const nomeFormatado = name.trim().split(/\s+/);

    if (nomeFormatado.length <= 1) {
        return nomeFormatado[0];
    }

    return `${nomeFormatado[0]} ${nomeFormatado[nomeFormatado.length - 1]}`;
}

function Profile({ photo, name, returnDate, state, onProfileClick, ...rest }) {
    const [visible, setVisible] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                observer.disconnect()
            }
        })

        if (imgRef.current) observer.observe(imgRef.current)

        return () => observer.disconnect()
    }, [])

    const handleClick = () => {
        onProfileClick({ photo, name, returnDate, state, ...rest })
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '—'
        const [year, month, day] = dateStr.split('-')
        return `${day}/${month}/${year}`
    }

    return (
        <li className={`card-sectors-profile ${state}`} onClick={handleClick}>
            <figure className="container-img-profile" ref={imgRef}>
                <img
                    src={visible ? photo : '/img/placeholder.avif'}
                    alt={`Foto de ${name}`}
                    loading="lazy"
                    decoding="async"
                />
            </figure>

            <div className="text-profile">
                <p className="profile-name">{formatarNome(name)}</p>
                {returnDate ? <p className="profile-return">{formatDate(returnDate)}</p> : null}
            </div>
        </li>
    )
}

export default Profile