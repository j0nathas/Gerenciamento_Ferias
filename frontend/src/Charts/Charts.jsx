import { employers } from "../App/App";
import { useEffect, useRef } from "react";
import './Charts.css'


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


function countState(state) {
    return employers.filter(e => e.state === state).length;
}



function Charts() {
    const canvasRef = useRef(null);
    const dataVacation = ajusteDados(employers, 'on-vacation');
    const dataRed = ajusteDados(employers, 'red');
    const dataYellow = ajusteDados(employers, 'yellow');
    const dataGreen = ajusteDados(employers, 'green');

    const allQuantities = [
        ...dataVacation.map((row) => row.quantity),
        ...dataRed.map((row) => row.quantity),
        ...dataYellow.map((row) => row.quantity),
        ...dataGreen.map((row) => row.quantity)
    ];

    const allShifts = [...new Set([
        ...dataVacation.map((row) => row.shift),
        ...dataRed.map((row) => row.shift),
        ...dataYellow.map((row) => row.shift),
        ...dataGreen.map((row) => row.shift)
    ])];


    useEffect(() => {

        const allQuantities = [
            ...dataVacation.map((row) => row.quantity),
            ...dataRed.map((row) => row.quantity),
            ...dataYellow.map((row) => row.quantity)
        ];

        const maxValue = Math.max(...allQuantities);

    }, []);




    return (
        <>
            <main className="Desk">

                <section className="flashcards">

                    <div className="flashcards-card background-red">
                        <p>2º vencimento próximo:</p>
                        <p className="flashcards-card-text">{countState('red')}</p>
                    </div>

                    <div className="flashcards-card background-yellow">
                        <p>Primeiro vencimento:</p>
                        <p className="flashcards-card-text">{countState('yellow')}</p>
                    </div>

                    <div className="flashcards-card background-on-vacation">
                        <p>Em férias:</p>
                        <p className="flashcards-card-text">{countState('on-vacation')}</p>
                    </div>

                    <div className="flashcards-card background-green">
                        <p>Inaptos:</p>
                        <p className="flashcards-card-text">{countState('green')}</p>
                    </div>

                </section>

                <section className="charts">


                    <div className="chart">
                        <table className="charts-card" >
                            <caption className="charts-card-title">Turnos</caption>
                            <tbody>
                                {allShifts.map((shift) => (
                                    <tr key={shift}>
                                        <td className="charts-card-shift">{shift}</td>
                                        <td className="charts-card-quantity background-on-vacation">{dataVacation.find(r => r.shift === shift)?.quantity || 0}</td>
                                        <td className="charts-card-quantity background-red">{dataRed.find(r => r.shift === shift)?.quantity || 0}</td>
                                        <td className="charts-card-quantity background-yellow">{dataYellow.find(r => r.shift === shift)?.quantity || 0}</td>
                                        <td className="charts-card-quantity background-green">{dataGreen.find(r => r.shift === shift)?.quantity || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section>


            </main>
        </>
    );
}

export default Charts;