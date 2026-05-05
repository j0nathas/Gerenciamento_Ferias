import { employers } from "../App/App";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import './Charts.css'
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

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


        const chart = new Chart(canvasRef.current, {
            type: "bar",
            options: {
                maintainAspectRatio: true,
                animation: true,
                plugins: {
                    datalabels: {
                        display: (context) => context.dataset.data[context.dataIndex] > 0,
                        anchor: "start",
                        align: "center",
                        font: { size: 20, weight: "bold" }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: maxValue + 1,
                    }
                }
            },
            data: {
                labels: dataVacation.map((row) => row.shift),
                datasets: [{
                    label: "Em Férias",
                    data: dataVacation.map((row) => row.quantity),
                    backgroundColor: "#c8f2fa",
                    borderColor: "rgb(170, 235, 255)",
                    borderWidth: 5,
                    borderRadius: 5,
                    hoverBackgroundColor: "#b3f4ff",
                    datalabels: { color: "#00869e" }
                }, {
                    label: "2º Vencimento Próximo",
                    data: dataRed.map((row) => row.quantity),
                    backgroundColor: "rgb(255, 225, 225)",
                    borderColor: "rgb(255, 193, 193)",
                    borderWidth: 5,
                    borderRadius: 5,
                    hoverBackgroundColor: "rgb(255, 193, 193)",
                    datalabels: { color: "rgb(223, 0, 0)" }
                },
                {
                    label: "Primeiro Vencimento",
                    data: dataYellow.map((row) => row.quantity),
                    backgroundColor: "rgb(255, 255, 211)",
                    borderColor: "rgb(231, 231, 194)",
                    borderWidth: 5,
                    borderRadius: 5,
                    hoverBackgroundColor: "rgb(247, 247, 166)",
                    datalabels: { color: "rgb(153, 153, 0)" }
                }],
            },
        });

        return () => {
            chart.destroy();
        };

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


                    <div className="chart" style={{ width: "40%" }}><canvas ref={canvasRef} /></div >


                </section>


            </main>
        </>
    );
}

export default Charts;