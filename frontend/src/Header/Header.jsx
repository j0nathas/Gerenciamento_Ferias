import './Header.css'
import { useState } from 'react'
import ConfigIcon from '/img/config.svg?react'
import NotificationIcon from '/img/notification.svg?react'


export default function Header() {
    return (
        <header>
            <div className="header-logo">
                <img src="/img/GCF-logo.png" width={130} alt="Férias" />
                <p>Gerenciamento de Férias</p>
            </div>

            <div className="header-buttons">
                <button className="config-button">
                    <ConfigIcon width={32} height={32} />
                </button>
                <button className="notification-button">
                    <NotificationIcon width={32} height={32} />
                </button>
                <button className="profile-button">
                    <figure className="container-img-profile profileConfig" >
                        <img src={'/img/1835.avif'} />
                    </figure>

                </button>
            </div>

        </header>
    )
}   