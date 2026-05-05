import Profile from "../Profile/Profile"

function GeneralView({ profilesByState, handleProfileClick }) {
    return (
        <>
            <div className='card-sectors-profiles-job'>
                {profilesByState['red'].map((p) => (
                    <Profile key={p.re} {...p} onProfileClick={handleProfileClick} />
                ))}

                {profilesByState['yellow'].map((p) => (
                    <Profile key={p.re} {...p} onProfileClick={handleProfileClick} />
                ))}

                {profilesByState['green'].map((p) => (
                    <Profile key={p.re} {...p} onProfileClick={handleProfileClick} />
                ))}

            </div>

            <div className="card-sectors-profiles-vacation">

                {profilesByState['on-vacation'].map((p) => (
                    <Profile key={p.re} {...p} onProfileClick={handleProfileClick} />
                ))}

            </div>
        </>
    )
}


export default GeneralView