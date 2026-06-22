import './Form.css';
import { useState, useRef } from 'react';
import Signature from '@lemonadejs/signature/dist/react';
import SaveIcon from '/img/save.svg?react';
import SavedIcon from '/img/saved.svg?react';
import ResetIcon from '/img/reset.svg?react';
import TrashIcon from '/img/trash.svg?react';
import { Toaster, toast } from 'react-hot-toast';
import { employers } from '../App/App';

const vacationOptions = [
    { id: 'daysVacationFull', label: 'Férias Completas (30 dias)', days: 30, isReadOnly: true },
    { id: 'daysVacationFirstUse', label: '1ª fruição (mínimo 14 dias)', days: 14, isReadOnly: false },
    { id: 'daysVacationSecondUse', label: '2ª fruição (mínimo 5 dias)', days: 5, isReadOnly: false },
    { id: 'daysVacationThirdUse', label: '3ª fruição (mínimo 5 dias)', days: 5, isReadOnly: false },
];

function Form({ setForms }) {
    const signatureRef = useRef(null);
    const imgRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectOption = (optionId) => {
        handleChange({
            target: { name: 'vacationType', value: optionId }
        });
        setIsOpen(false);
    };

    const [formData, setFormData] = useState({
        date: '',
        re: '',
        employee: '',
        startDate: '',
        endDate: '',
        startDatePeriod: '',
        endDatePeriod: '',
        vacationType: '',
        daysOnVacation: '',
        minDaysOnVacation: '',
        allowance: false,
        fiftyPercentThirteenth: false,

    });

    const [isReadOnly, setIsReadOnly] = useState(true);
    const [rotate, setRotate] = useState(false);
    const [save, setSave] = useState(false);
    const [remove, setRemove] = useState(false);

    const onGetImage = () => { imgRef.current.src = signatureRef.current.getImage(); };
    const reset = () => { signatureRef.current.value = []; };

    const calculateEndDate = (startDate, days) => {
        if (!startDate || !days) return '';
        const date = new Date(startDate);
        date.setUTCDate(date.getUTCDate() + parseInt(days));
        return date.toISOString().split('T')[0];
    };

    const [isSigned, setIsSigned] = useState(false);

    const isFormValid =
        formData.re !== '' &&
        formData.employee !== '' &&
        formData.vacationType !== '' &&
        formData.startDate !== '' &&
        formData.daysOnVacation !== '' &&
        isSigned;

    function handleReset() {
        setRotate(false);
        requestAnimationFrame(() => setRotate(true));
        reset();
    }

    function handleSave() {
        setSave(true);
        setTimeout(() => { setSave(false) }, 2000);

        onGetImage();
        setIsSigned(true);
    }

    function removeSignature() {
        setRemove(true);

        if (imgRef.current.src) {
            imgRef.current.src = '';
            toast.error('Assinatura salva removida');
            setIsSigned(false);
        } else {
            toast('Nenhuma assinatura salva!', {
                icon: 'ℹ️',
            });
        }

        setTimeout(() => {
            setRemove(false);
        }, 2000);



    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const handlers = {
            re: () => {
                const found = employers.find(emp => emp.re.toString() === value);
                setFormData(prev => ({
                    ...prev,
                    re: value,
                    employee: found?.name ?? '',
                    startDatePeriod: found?.aquisitivo_inicio ?? '',
                    endDatePeriod: found?.aquisitivo_Final ?? '',
                }));
            },

            // Lógica para o novo Select
            vacationType: () => {
                const selectedOption = vacationOptions.find(opt => opt.id === value);
                if (selectedOption) {
                    setIsReadOnly(selectedOption.isReadOnly);
                    setFormData(prev => ({
                        ...prev,
                        vacationType: value,
                        daysOnVacation: selectedOption.days,
                        minDaysOnVacation: selectedOption.days,
                        endDate: calculateEndDate(prev.startDate, selectedOption.days),
                    }));
                } else {
                    setFormData(prev => ({ ...prev, vacationType: '', daysOnVacation: '', endDate: '' }));
                }
            },

            startDate: () => {
                setFormData(prev => ({
                    ...prev,
                    startDate: value,
                    endDate: prev.daysOnVacation ? calculateEndDate(value, prev.daysOnVacation) : '',
                }));
            },

            daysOnVacation: () => {
                const days = Math.min(Math.max(Number(value), 0), 30);
                setFormData(prev => ({
                    ...prev,
                    daysOnVacation: days,
                    endDate: calculateEndDate(prev.startDate, days),
                }));
            },



            checkbox: () => {
                setFormData(prev => ({ ...prev, [name]: checked }));
            },

            default: () => {
                setFormData(prev => ({ ...prev, [name]: value }));
            },
        };

        if (type === 'checkbox') {
            handlers.checkbox();
        } else if (name === 'vacationType') {
            handlers.vacationType();
        } else {
            (handlers[name] ?? handlers.default)();
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const dataAtual = new Date();

        const formulario = {
            ...formData,
            date: dataAtual
        };

        setFormData(formulario);
        setForms(prev => [...prev, formulario]);

        toast.success("Formulário enviado!");
        console.log('Dados do formulário:', formulario);
    };

    return (
        <>
            <Toaster position="bottom-center" />
            <main className="form-container">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h1>Solicitação de Férias</h1>
                        <p>Preencha o formulário abaixo para registrar suas férias</p>
                    </div>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="re">RE</label>
                                <input className='form-group-input' type="number" id="re" name="re" value={formData.re} onChange={handleChange} placeholder="Digite seu RE" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="employee">Funcionário</label>
                                <input className='readOnly' type="text" id="employee" name="employee" value={formData.employee} readOnly placeholder="Nome automático" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDatePeriod">Aquisitivo Inicial</label>
                                <input className='readOnly' type="date" id="startDatePeriod" name="startDatePeriod" value={formData.startDatePeriod} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDatePeriod">Aquisitivo Final</label>
                                <input className='readOnly' type="date" id="endDatePeriod" name="endDatePeriod" value={formData.endDatePeriod} readOnly />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="vacationType">Tipo de Férias</label>
                                <div className={`form-group-input ${isOpen ? 'is-open' : ''}`}>
                                    <div
                                        className="select-display"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        {vacationOptions.find(opt => opt.id === formData.vacationType)?.label || "Selecione o tipo..."}
                                        <span className={`select-arrow ${isOpen ? 'up' : 'down'}`}></span>
                                    </div>

                                    {isOpen && (
                                        <ul className="select-dropdown">
                                            {vacationOptions.map(option => (
                                                <li
                                                    key={option.id}
                                                    className={`select-item ${formData.vacationType === option.id ? 'active' : ''}`}
                                                    onClick={() => handleSelectOption(option.id)}
                                                >
                                                    {option.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate">Data de Início</label>
                                <input className='form-group-input' type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="daysOnVacation">Dias de Férias</label>
                                <input
                                    className={isReadOnly ? 'readOnly' : 'form-group-input'}
                                    type="number"
                                    id="daysOnVacation"
                                    name="daysOnVacation"
                                    value={formData.daysOnVacation}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    min={formData.minDaysOnVacation}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">Data de Retorno</label>
                                <input className='readOnly' type="date" id="endDate" name="endDate" value={formData.endDate} readOnly />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className='signature-area'>
                                <div className="signature-wrapper">
                                    <Signature ref={signatureRef} width={600} height={200} className="signature-field" instructions="Assine neste campo" />
                                </div>
                                <div className="signature-buttons">
                                    <button className="form-btn" type="button" onClick={handleReset}><ResetIcon width={22} height={22} className={rotate ? 'rotate-icon' : ''} /></button>
                                    <button
                                        className={`form-btn ${save ? 'saved-btn' : ''}`}
                                        type="button"
                                        onClick={() => { handleSave(); toast.success('Salvo com sucesso!'); }}
                                    >
                                        {save ? <SavedIcon width={22} height={22} /> : <SaveIcon width={22} height={22} />}
                                    </button>
                                    <button className={`form-btn ${remove ? 'remove-signature' : ''}`} type="button" onClick={() => removeSignature()}
                                    >
                                        <TrashIcon width={22} height={22} />
                                    </button>
                                </div>
                                <div className='signature-area-save'>
                                    <img ref={imgRef} className="image full-width" />
                                </div>
                            </div>
                        </div>

                        <div className="form-row checkbox-submit">
                            <div className='checkbox-row'>
                                <div className={`form-group-checkbox ${formData.allowance ? 'checkbox-active' : ''}`}>
                                    <label className="custom-checkbox">
                                        <input type="checkbox" name="allowance" checked={formData.allowance} onChange={handleChange} />
                                        <span className="checkmark"></span>
                                        1/3 em Abono
                                    </label>
                                </div>
                                <div className={`form-group-checkbox ${formData.fiftyPercentThirteenth ? 'checkbox-active' : ''}`}>
                                    <label className="custom-checkbox">
                                        <input type="checkbox" name="fiftyPercentThirteenth" checked={formData.fiftyPercentThirteenth} onChange={handleChange} />
                                        <span className="checkmark"></span>
                                        50% 13º salário
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="form-btn-submit" disabled={!isFormValid}>Enviar Solicitação</button>
                        </div>



                    </form>
                </div >
            </main >
        </>
    );
}

export default Form;