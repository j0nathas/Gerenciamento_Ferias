import { useState, useMemo } from 'react'
import './HomePage.css'
import Profile from './Profile/Profile'
import ProInfo from './ProInfo/ProInfo'
import { employers } from '../App/App'

const getReturnDate = (endDate) => {
  if (!endDate) return null;
  const date = new Date(endDate);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().split('T')[0];
}

function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [activeShift, setActiveShift] = useState('Geral')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const shifts = useMemo(() => {
    const uniqueShifts = [...new Set(employers.map(e => e.shift))];
    return ['Geral', ...uniqueShifts];
  }, []);

  const profilesByState = useMemo(() => {
    const filtered = employers.filter(emp =>
      activeShift === 'Geral' ? true : emp.shift === activeShift
    );

    const initialAcc = { 'on-vacation': [], 'green': [], 'yellow': [], 'red': [] };

    return filtered.reduce((acc, emp) => {
      const profile = {
        ...emp,
        returnDate: getReturnDate(emp.endDate)
      };
      if (acc[emp.state]) acc[emp.state].push(profile);
      return acc;
    }, initialAcc);
  }, [activeShift]);

  const mapLegend = {
    'on-vacation': { label: 'Em férias' },
    'green': { label: 'Sem férias vencidas' },
    'yellow': { label: 'Primeiro vencimento' },
    'red': { label: 'Segundo vencimento próximo' }
  }

  const handleShiftSelect = (shift) => {
    setActiveShift(shift);
    setIsDropdownOpen(false); // Fecha a lista ao selecionar
  }

  return (
    <>
      <main className="home-page">
        <nav className="card-sectors">
          <div className='card-sectors-select'>
            <p className='card-sectores-select-text'>Selecionado:</p>

            <div className="dropdown-container">
              <button
                className="dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {activeShift}
                <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-list">
                  {shifts.map(shift => (
                    <li
                      key={shift}
                      className={`dropdown-item ${activeShift === shift ? 'active' : ''}`}
                      onClick={() => handleShiftSelect(shift)}
                    >
                      {shift}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <section>
              {Object.entries(mapLegend).map(([key, { label }]) => (
                <article className='legend' key={key}>
                  <div className={`${key}-legend`}></div>
                  <h3 className='legend-text text-sm'>{label}</h3>
                </article>
              ))}
            </section>
          </div>

          <div className="card-sectors-profiles">
            <div className='card-sectors-profiles-job'>
              {['red', 'yellow', 'green'].map(state =>
                profilesByState[state].map(p => (
                  <Profile key={p.re} {...p} onProfileClick={setSelectedProfile} />
                ))
              )}
            </div>

            <div className="card-sectors-profiles-vacation">
              {profilesByState['on-vacation'].map((p) => (
                <Profile key={p.re} {...p} onProfileClick={setSelectedProfile} />
              ))}
            </div>
          </div>
        </nav>
      </main>

      {selectedProfile && (
        <ProInfo {...selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </>
  )
}

export default HomePage