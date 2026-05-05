import Profile from "../Profile/Profile"




function ShiftView({ profilesByState, shifts, handleProfileClick }) {

    console.log(shifts)
    return (
        <>
            <div className="card-sectores-profiles-container">
                {
                    shifts.map((shift) => {
                        return (
                            <div className="card-sectors-profiles-container-shifts">
                                <h1>{shift}</h1>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

export default ShiftView