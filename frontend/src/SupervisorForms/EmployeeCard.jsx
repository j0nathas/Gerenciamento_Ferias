import './EmployeeCard.css';
import { employers } from '../App/App';
import PlaneIcon from '/img/plane.svg?react';
import ExpandIcon from '/img/expand.svg?react';
import { formatarNome } from '../utils/profileUtils.js'

function resultState(result, text = '') {
    return {
        semanas: result,
        classe:
            result === 1 ? `${text}point-yellow` :
                result === 2 ? `${text}point-orange` :
                    result === 3 ? `${text}point-red` :
                        `${text}point-gray`
    };
}

function formatarData(data) {
    return `${String(data.getFullYear())}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;

}

function encontrarTurno(register) {
    const colaborador = employers.find((e) => String(e.re) === String(register));

    if (!colaborador) {
        return "Não encontrado";
    }

    return colaborador.shift;
}

function calcularSemanas(dataSolicitacao, dataAtual, text = '') {
    const umDia = 1000 * 60 * 60 * 24;

    const dataSolicitacaoFormatado = formatarData(dataSolicitacao);
    const dataAtualFormatada = formatarData(dataAtual);

    const diferencaDias = Math.abs(
        (new Date(dataAtualFormatada) - new Date(dataSolicitacaoFormatado)) / umDia
    );

    const result = Math.max(1, Math.ceil(diferencaDias / 7));

    return resultState(result, text);
}

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    return { day, month: months[parseInt(month, 10) - 1], year };
}

export default function EmployeeCard({ form, photoUrl }) {
    const start = formatDate(form.startDate);
    const end = formatDate(form.endDate);
    const backgroundAndText = calcularSemanas(form.date, new Date(), 'back-text-').classe;
    const textColor = calcularSemanas(form.date, new Date(), 'text-').classe;

    console.log(textColor)

    return (
        <div className="vticket">
            <div className="vticket-main">
                <header className={`vticket-header ${backgroundAndText}`}>
                    <span className="vticket-header-title">{formatarNome(form.employee)}</span>
                </header>

                <div className="vticket-body">
                    <div className="vticket-route">
                        <div className="vticket-stop">
                            <span className="vticket-stop-label">SAÍDA</span>
                            <strong className={`vticket-stop-date ${textColor}`}>
                                {start.day} {start.month}
                            </strong>
                            <span className="vticket-stop-year">{start.year}</span>
                        </div>

                        <div className="vticket-path">
                            <span className="vticket-dot" />
                            <span className="vticket-line" />
                            <PlaneIcon width={30} height={30} className={textColor} />
                            <span className="vticket-line" />
                            <span className="vticket-dot" />
                        </div>

                        <div className="vticket-stop vticket-stop-end">
                            <span className="vticket-stop-label">RETORNO</span>
                            <strong className={`vticket-stop-date ${textColor}`}>
                                {end.day} {end.month}
                            </strong>
                            <span className="vticket-stop-year">{end.year}</span>
                        </div>
                    </div>

                    <div className="vticket-divider" />

                    <div className="vticket-details">
                        <div className="vticket-field">
                            <span className="vticket-field-label">RE</span>
                            <strong className="vticket-field-value">{form.re}</strong>
                        </div>
                        <div className="vticket-field">
                            <span className="vticket-field-label">Dias</span>
                            <strong className="vticket-field-value">{form.daysOnVacation}</strong>
                        </div>
                        <div className="vticket-field">
                            <span className="vticket-field-label">Turno:</span>
                            <strong className="vticket-field-value">{encontrarTurno(form.re)}</strong>
                        </div>
                        <div className="vticket-field vticket-buttons">
                            <button className='vticket-stub-btn btn-accept'>Aceitar</button>
                            <button className='vticket-stub-btn btn-refuse'>Recusar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`vticket-stub ${backgroundAndText}`}>
                <span className="vticket-stub-photo"><img src={photoUrl} className='w-50' alt="" /></span>


                <div className="vticket-stub-field">
                    <button className={`vticket-field-btn btn-details`}><ExpandIcon width={40} height={40} /></button>
                </div>

                <div className="vticket-stub-field">
                    <span className='vticket-stub-field-text'>Data Envio:</span>
                    <strong className='vticket-stub-field-text'>{formatarData(form.date)}</strong>
                </div>

            </div>
        </div >
    );
}