import { useState } from 'react'
import HomeIcon from '/img/home.svg?react'
import CalendarIcon from '/img/calendar.svg?react'
import ChartIcon from '/img/chart.svg?react'
import FormIcon from '/img/form.svg?react'
import Building from '/img/building.svg?react'


import './App.css'
import HomePage from '../HomePage/HomePage'
import Calendar from '../Calendar/Calendar'
import Charts from '../Charts/Charts'
import Form from '../Form/Form'
import CalendarReact from '../Teste_calendar/CalendarReact'

export const employers = [
  {
    re: 1835, name: 'Jonathas Santos de Oliveira', shift: 'ADM', photo: '/img/1835.avif', startDate: '', endDate: '',
    aquisitivo_inicio: '2025-08-21', aquisitivo_Final: '2026-08-20', sector: 'LANTERNA', state: 'green',
  },
  {
    re: 3333, name: 'Eliel da Silva', photo: '/img/aprendiz.avif', shift: 'ADM', startDate: '', endDate: '',
    aquisitivo_inicio: '2025-08-21', aquisitivo_Final: '2026-08-20', sector: 'LANTERNA', state: 'green'
  },
  {
    re: 1510, name: 'Jonathan Neres Veloso', photo: '/img/1510.avif', shift: 'ADM', startDate: '2026-05-04', endDate: '2026-05-29',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-03-17', sector: 'LANTERNA', state: 'on-vacation',
  },
  {
    re: 922, name: 'Leandro da Silva Almeida', photo: '/img/922.avif', shift: 'ADM', startDate: '', endDate: '',
    aquisitivo_inicio: '2025-03-21', aquisitivo_Final: '2026-03-20', sector: 'LANTERNA', state: 'yellow',
  },
  {
    re: 1781, name: 'Victor Fernando Santos Nunes', photo: '/img/1781.avif', shift: 'ADM', startDate: '', endDate: '',
    aquisitivo_inicio: '2024-11-21', aquisitivo_Final: '2025-11-20', sector: 'LANTERNA', state: 'red',
  },
  {
    re: 1132, name: 'Fabrício Fonseca', photo: '/img/1132.avif', shift: '1º Turno', startDate: '2026-04-23', endDate: '2026-05-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 1065, name: 'Luana de Jesus', photo: '/img/1065.avif', shift: 'ADM', startDate: '', endDate: '',
    aquisitivo_inicio: '2025-04-30', aquisitivo_Final: '2026-05-01', sector: 'LANTERNA', state: 'yellow'
  },
  {
    re: 1437, name: 'Pedro da Silva', photo: '/img/1437.avif', shift: 'ADM', startDate: '', endDate: '',
    aquisitivo_inicio: '2025-07-15', aquisitivo_Final: '2026-07-14', sector: 'LANTERNA', state: 'green'
  },
  {
    re: 4785, name: 'Arthur Facca', photo: '/img/4785.avif', shift: 'ADM', startDate: '', endDate: '',
    aquisitivo_inicio: '2025-07-15', aquisitivo_Final: '2026-07-14', sector: 'LANTERNA', state: 'green'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
  {
    re: 2334, name: 'Rogério Silva', photo: '/img/1132.avif', shift: '2º Turno', startDate: '2026-06-23', endDate: '2026-07-22',
    aquisitivo_inicio: '2025-02-17', aquisitivo_Final: '2026-02-16', sector: 'LANTERNA', state: 'on-vacation'
  },
]

function ajusteDados(employers, state) {
  const groups = {};

  employers.forEach((e) => {
    if (!groups[e.shift]) {
      groups[e.shift] = 0;
    }
    if (e.state === state) {
      groups[e.shift]++;
    }
  });


  return Object.entries(groups).map(([shift, quantity]) => {
    return { shift, quantity };
  });
}



export function AddDate(startDate, days) {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().split('T')[0];
}

export const mapLegend = {
  'on-vacation': { label: 'Em férias' },
  'green': { label: 'Sem férias vencidas' },
  'yellow': { label: 'Primeiro vencimento' },
  'red': { label: 'Segundo vencimento próximo' }
}

export const allProfiles = employers.map(emp => ({
  re: emp.re,
  photo: emp.photo,
  name: emp.name,
  shift: emp.shift,
  state: emp.state,
  sector: emp.sector,
  startDate: emp.startDate,
  endDate: emp.endDate,
  returnDate: emp.endDate ? AddDate(emp.endDate, 1) : null,
  aquisitivo_inicio: emp.aquisitivo_inicio,
  aquisitivo_Final: emp.aquisitivo_Final,
}))

export const profilesByState = Object.keys(mapLegend).reduce((acc, state) => {
  acc[state] = allProfiles.filter((p) => p.state === state)
  return acc
}, {})


const btnSelect = [
  { id: 'home', title: 'Home', icon: HomeIcon },
  { id: 'calendar', title: 'Calendário', icon: CalendarIcon },
  { id: 'charts', title: 'Gráfico', icon: ChartIcon },
  { id: 'form', title: 'Formulário', icon: FormIcon },
  { id: 'calendarReact', title: 'Calendário React', icon: Building },
]

function App() {


  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'calendar':
        return <Calendar />
      case 'calendarReact':
        return <CalendarReact />
      case 'charts':
        return <Charts />
      case 'form':
        return <Form />
      default:
        return <HomePage />
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src="/img/vacation.svg" width={100} alt="Férias" />
        </div>

        <div className="selectPageContainer">

          {
            btnSelect.map(btn => (
              <button key={btn.id} className={`selectPage ${currentPage === btn.id ? 'active' : ''}`} onClick={() => { setCurrentPage(btn.id) }} title={btn.title}>
                <btn.icon width={57} height={57} />
              </button>
            ))
          }

        </div>
      </header>

      {renderPage()}
    </>
  )
}

export default App
