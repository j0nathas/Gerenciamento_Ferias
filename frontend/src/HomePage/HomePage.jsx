import { useState } from 'react'
import './HomePage.css'
import Profile from './Profile/Profile'
import ProInfo from './ProInfo/ProInfo'
import GeneralView from './GeneralView/GeneralView'
import ShiftView from './ShiftView/ShiftView'
import { employers } from '../App/App'


function AddDate(startDate, days) {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().split('T')[0];
}

function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState(null)

  const handleProfileClick = (profileData) => {
    setSelectedProfile(profileData)
  }

  const handleCloseModal = () => {
    setSelectedProfile(null)
  }

  const mapLegend = {
    'on-vacation': { label: 'Em férias' },
    'green': { label: 'Sem férias vencidas' },
    'yellow': { label: 'Primeiro vencimento' },
    'red': { label: 'Segundo vencimento próximo' }
  }

  const legendItems = Object.entries(mapLegend).map(([key, { label }]) => (
    <article className='legend' key={key}>
      <div className={`${key}-legend`}></div>
      <h3 className='legend-text'>{label}</h3>
    </article>
  ))


  const allProfiles = employers.map(emp => ({
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
  const profilesByState = Object.keys(mapLegend).reduce((acc, state) => {
    acc[state] = allProfiles.filter((p) => p.state === state)
    return acc
  }, {})

  const [currentPage, setCurrentPage] = useState('general')

  const shifts = [...new Set(employers.map(e => e.shift))]

  const views = {
    general: <GeneralView profilesByState={profilesByState} handleProfileClick={handleProfileClick} />,
    shift: <ShiftView allProfiles={allProfiles} shifts={shifts} handleProfileClick={handleProfileClick} />
  }

  const tabs = [
    { id: 'general', label: 'Geral' },
    { id: 'shift', label: 'Turnos' }
  ]

  return (
    <>
      <main className="home-page">
        <nav className="card-sectors">

          <div className='card-sectors-head'>
            <h2 className="card-sectors-title">FÉRIAS</h2>
            <section>{legendItems}</section>
          </div>

          <div className='card-sectors-select'>
            <p className='card-sectores-select-text'>Selecione por:</p>
            {
              tabs.map(tab => (
                <button key={tab.id} className={`card-sectors-select-button ${currentPage === tab.id ? 'active' : ''}`} onClick={() => setCurrentPage(tab.id)}>
                  {tab.label}
                </button>
              ))
            }
          </div>

          <div className="card-sectors-profiles">

            {views[currentPage]}

          </div>



        </nav>
      </main>

      {selectedProfile && (
        <ProInfo {...selectedProfile} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default HomePage