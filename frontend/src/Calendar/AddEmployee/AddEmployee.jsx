import './AddEmployee.css'
import { useState } from 'react';
import { employers } from '../../App/App';
import CloseIcon from '/img/close.svg?react';

export default function AdddEmployee({ setAddEmployee, employees, setEmployees }) {

    const [simulationEmployee, setSimulationEmployee] = useState({
        re: '',
        employee: '',
        startDate: '',
        endDate: '',
        daysOnVacation: '',
    });

    const haveInformation =
        simulationEmployee.re !== '' &&
        simulationEmployee.employee !== '' &&
        simulationEmployee.startDate !== '' &&
        simulationEmployee.daysOnVacation !== '';

    const calculateEndDate = (startDate, days) => {
        if (!startDate || !days) return '';
        const date = new Date(startDate);
        date.setUTCDate(date.getUTCDate() + parseInt(days) - 1);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (simulationEmployee.startDate < new Date().toISOString().split('T')[0]) {
            alert('A data não pode ser anterior a hoje.');
            return;
        }

        const DataSimulation = {
            start: new Date(simulationEmployee.startDate),
            end: new Date(simulationEmployee.endDate),
            name: simulationEmployee.employee,
            id: simulationEmployee.re,
            type: 'task',
            progress: Math.min(100, Math.max(0,
                (new Date() - new Date(simulationEmployee.startDate)) /
                (new Date(simulationEmployee.endDate) - new Date(simulationEmployee.startDate)) * 100
            )),
            isDisabled: false,
        }

        setEmployees((prev) => [DataSimulation, ...prev]);
        setAddEmployee(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const handlers = {
            re: () => {
                const found = employers.find(emp => emp.re.toString() === value);
                setSimulationEmployee(prev => ({
                    ...prev,
                    re: value,
                    employee: found?.name ?? '',
                }));
            },

            startDate: () => {
                setSimulationEmployee(prev => ({
                    ...prev,
                    startDate: value,
                    endDate: prev.daysOnVacation ? calculateEndDate(value, prev.daysOnVacation) : '',
                }));
            },

            daysOnVacation: () => {
                const days = Math.min(Math.max(Number(value), 0), 30);
                setSimulationEmployee(prev => ({
                    ...prev,
                    daysOnVacation: days,
                    endDate: calculateEndDate(prev.startDate, days),
                }));
            },

            default: () => {
                setSimulationEmployee(prev => ({ ...prev, [name]: value }));
            },

        };
        (handlers[name] || handlers.default)();
    };

    return (
        <>

            <form onSubmit={handleSubmit} className="form-simulation">
                <div className='form-simulation-group'>
                    <label htmlFor="re" className='form-simulation-label'>RE:</label>
                    <input type="number" className='form-simulation-input' name='re' value={simulationEmployee.re} onChange={handleChange} required />
                </div>
                <div className='form-simulation-group'>
                    <label htmlFor="name" className='form-simulation-label'>Nome:</label>
                    <input type="text" className='form-simulation-input readOnly-simulation' name='employee' value={simulationEmployee.employee} placeholder='Nome Automático' readOnly />
                </div>
                <div className='form-simulation-group'>
                    <label htmlFor="datebeginning" className='form-simulation-label'>Dia de Início:</label>
                    <input type="date" min={new Date().toISOString().split('T')[0]} name='startDate' value={simulationEmployee.startDate} onChange={handleChange} className='form-simulation-input' />
                </div>
                <div className='form-simulation-group'>
                    <label htmlFor="daysOnVacation" className='form-simulation-label'>Qnte de dias:</label>
                    <input type="number" min={5} value={simulationEmployee.daysOnVacation} name='daysOnVacation' onChange={handleChange} className='form-simulation-input' />
                </div>

                <button type="submit" disabled={!haveInformation} onClick={handleSubmit} className='form-simulation-submit'>Simular</button>
            </form>
        </>
    )
}