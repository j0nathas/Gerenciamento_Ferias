import { useState } from 'react'
import './Calendar.css'
import { employers } from '../App/App'

function Calendar() {
    const [selectedYear, setSelectedYear] = useState(2026)
    const [startMonth, setStartMonth] = useState(0) // 0 = Jan, 5 = Jun
    const [selectedSectors, setSelectedSectors] = useState(['INJEÇÃO', 'LANTERNA', 'SMALL', 'METALIZAÇÃO', 'QUALIDADE', 'Manufatura', 'Engenharia'])
    const [hoveredPerson, setHoveredPerson] = useState(null)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const totalDays = 30 * 12 // Aproximado

    // Calcula a posição da barra de férias
    const getVacationPosition = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const calendarStart = new Date(selectedYear, 0, 1)
        const calendarEnd = new Date(selectedYear, 11, 31)

        // Ajusta se a férias começa antes ou depois
        const adjustedStart = start < calendarStart ? calendarStart : start
        const adjustedEnd = end > calendarEnd ? calendarEnd : end

        if (adjustedStart > adjustedEnd) {
            return { left: -100, width: 0 }
        }

        const daysFromStart = Math.floor((adjustedStart - calendarStart) / (1000 * 60 * 60 * 24))
        const daysDuration = Math.floor((adjustedEnd - adjustedStart) / (1000 * 60 * 60 * 24)) + 1

        return {
            left: (daysFromStart / 365) * 100,
            width: (daysDuration / 365) * 100,
        }
    }

    // Calcula a posição do dia atual
    const getTodayPosition = () => {
        const today = new Date()
        const calendarStart = new Date(selectedYear, 0, 1)

        // Se o dia atual não está no ano selecionado, não mostra a linha
        if (today.getFullYear() !== selectedYear) {
            return -100
        }

        const daysFromStart = Math.floor((today - calendarStart) / (1000 * 60 * 60 * 24))
        return (daysFromStart / 365) * 100
    }

    // Verifica se a férias passou
    const isVacationPast = (endDate) => {
        const end = new Date(endDate)
        const today = new Date()
        return end < today
    }

    // Gera os 12 meses do ano
    const getMonthsRange = () => {
        const monthsRange = []
        for (let i = 0; i < 12; i++) {
            monthsRange.push({
                name: months[i],
                month: i,
                year: selectedYear,
                daysInMonth: new Date(selectedYear, i + 1, 0).getDate()
            })
        }
        return monthsRange
    }

    const monthsRange = getMonthsRange()
    const years = [2025, 2026, 2027, 2028]

    // Obtém setores únicos
    const allSectors = [...new Set(employers.map(e => e.sector))].sort()

    // Toggle setor selecionado
    const toggleSector = (sector) => {
        setSelectedSectors(prev => {
            if (prev.includes(sector)) {
                return prev.filter(s => s !== sector)
            } else {
                return [...prev, sector]
            }
        })
    }

    // Filtra férias por setor selecionado
    const filteredVacationsData = employers.filter(vacation =>
        selectedSectors.includes(vacation.sector)
    )

    // Manipula o hover do mouse
    const handleMouseEnter = (person, event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setTooltipPos({
            x: rect.left + rect.width / 2,
            y: rect.top
        })
        setHoveredPerson(person)
    }

    const handleMouseLeave = () => {
        setHoveredPerson(null)
    }

    // Formata data para formato brasileiro
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('pt-BR')
    }

    // Calcula dias de férias
    const getVacationDays = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    }

    return (
        <main className="calendar-container">
            <div className="calendar-header">
                <div className="year-selector">
                    <label>Ano:</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="sector-filter">
                    <label>Setores:</label>
                    <div className="sector-checkboxes">
                        {allSectors.map(sector => (
                            <label key={sector} className="sector-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedSectors.includes(sector)}
                                    onChange={() => toggleSector(sector)}
                                />
                                <span>{sector}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="calendar-wrapper">
                <div className="timeline-container">
                    {/* Headers dos meses */}
                    <div className="months-header">
                        {monthsRange.map((month, idx) => (
                            <div key={idx} className="month-header" style={{ flex: month.daysInMonth }}>
                                <div className="month-name">{month.name}</div>
                            </div>
                        ))}
                    </div>

                    {/* Grid de meses */}
                    <div className="months-grid">
                        {monthsRange.map((month, idx) => (
                            <div key={idx} className="month-column" style={{ flex: month.daysInMonth }}>
                                <div className="month-days">
                                    {[...Array(Math.ceil(month.daysInMonth / 7))].map((_, weekIdx) => (
                                        <div key={weekIdx} className="week-divider" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Linha do dia atual */}
                    {getTodayPosition() >= 0 && getTodayPosition() <= 100 && (
                        <div className="today-line" style={{ left: `${getTodayPosition()}%` }} />
                    )}

                    {/* Barras de férias */}
                    <div className="vacation-bars">
                        {filteredVacationsData.map(person => {
                            const position = getVacationPosition(person.startDate, person.endDate)
                            if (position.width <= 0) return null
                            if (!person.endDate) return

                            const isPast = isVacationPast(person.endDate)
                            return (
                                <div key={person.id} className="person-vacation-row">
                                    <div
                                        className={`vacation-bar ${isPast ? 'past' : ''}`}
                                        style={{
                                            left: `${position.left}%`,
                                            width: `${position.width}%`,
                                        }}
                                        onMouseEnter={(e) => handleMouseEnter(person, e)}
                                        onMouseLeave={handleMouseLeave}
                                        title={`${person.name}: ${person.startDate} a ${person.endDate}`}
                                    >
                                        <div className="vacation-content">
                                            <span className="vacation-name">{person.name}</span>
                                            <span className="vacation-sector">{person.sector}</span>
                                        </div>
                                        <span className="vacation-days">
                                            {Math.ceil((new Date(person.endDate) - new Date(person.startDate)) / (1000 * 60 * 60 * 24))}d
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Tooltip Portal */}
            {hoveredPerson && (
                <div
                    className="vacation-tooltip-portal"
                    style={{
                        left: `${tooltipPos.x}px`,
                        top: `${tooltipPos.y}px`
                    }}
                >
                    <div className="tooltip-row">
                        <span className="tooltip-label">Nome:</span>
                        <span className="tooltip-value">{hoveredPerson.name}</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="tooltip-label">Setor:</span>
                        <span className="tooltip-value">{hoveredPerson.sector}</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="tooltip-label">Início:</span>
                        <span className="tooltip-value">{formatDate(hoveredPerson.startDate)}</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="tooltip-label">Retorno:</span>
                        <span className="tooltip-value">{formatDate(hoveredPerson.endDate)}</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="tooltip-label">Dias:</span>
                        <span className="tooltip-value">{getVacationDays(hoveredPerson.startDate, hoveredPerson.endDate)}</span>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Calendar