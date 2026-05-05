import './ProInfo.css'


function calcularSaldoDias(aquisitivo_inicio) {
    if (!aquisitivo_inicio) return 0

    const [year, month, day] = aquisitivo_inicio.split('-').map(Number)
    const inicio = new Date(Date.UTC(year, month - 1, day))
    const hoje = new Date()
    const hoje_utc = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()))

    const diasPassados = Math.floor((hoje_utc - inicio) / (1000 * 60 * 60 * 24))

    const saldo = Math.min(Math.floor((diasPassados / 365) * 30), 60)

    return saldo
}

function ProInfo({ re, name, photo, shift, startDate, endDate, returnDate, aquisitivo_inicio, aquisitivo_Final, sector, state, onClose }) {
    const statusMap = {
        'on-vacation': 'Em férias',
        'green': 'Sem férias vencidas',
        'yellow': 'Primeiro vencimento',
        'red': 'Segundo vencimento próximo'
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '—'
        const [year, month, day] = dateStr.split('-')
        return `${day}/${month}/${year}`
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="pro-info-backdrop" onClick={handleBackdropClick}>
            <div className="pro-info-modal">
                <button className="pro-info-close" onClick={onClose}>&times;</button>

                <figure className="pro-info-photo">
                    <img src={photo} alt={`Foto de ${name}`} />
                </figure>

                <div className="pro-info-content">
                    <h2>{name}</h2>
                    <p> <strong>RE:</strong> {re} | <strong>Turno:</strong> {shift} |<strong>Setor:</strong> {sector}</p>

                    <div className="pro-info-row">
                        <span className="pro-info-label">Status:</span>
                        <span className={`pro-info-status ${state}`}>{statusMap[state]}</span>
                    </div>

                    <div className="pro-info-row">
                        <span className="pro-info-label">Período Aquisitivo:</span>
                        <span>{formatDate(aquisitivo_inicio)} → {formatDate(aquisitivo_Final)}</span>
                    </div>

                    <div className="pro-info-row">
                        <span className="pro-info-label">Saldo de Dias:</span>
                        <span>{calcularSaldoDias(aquisitivo_inicio)}</span>
                    </div>

                    {startDate ?
                        <div className="pro-info-row">
                            <span className="pro-info-label">Início das Férias:</span>
                            <span>{formatDate(startDate)}</span>
                        </div>
                        : null}

                    {endDate ? <div className="pro-info-row">
                        <span className="pro-info-label">Fim das Férias:</span>
                        <span>{formatDate(endDate)}</span>
                    </div> : null}

                    {returnDate ? <div className="pro-info-row">
                        <span className="pro-info-label">Data de Retorno:</span>
                        <span>{formatDate(returnDate)}</span>
                    </div> : null}



                    <button className="pro-info-btn-close" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    )
}

export default ProInfo