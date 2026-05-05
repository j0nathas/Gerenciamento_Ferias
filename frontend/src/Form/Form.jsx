import './Form.css';
import { useState } from 'react';
import React, { useRef } from 'react';
import Signature from '@lemonadejs/signature/dist/react';
import { employers } from '../App/App'


function Form() {

    //==========================ASSINATURA==============================


    const signatureRef = useRef(null);
    const imgRef = useRef(null);

    const onGetImage = function () {
        imgRef.current.src = signatureRef.current.getImage();
    };

    const reset = function () {
        signatureRef.current.value = [];
    };


    //==========================ASSINATURA==============================



    const [formData, setFormData] = useState({
        re: '',
        employee: '',
        startDate: '',
        endDate: '',
        startDatePeriod: '',
        endDatePeriod: '',
        name: false,
        daysVacationFull: false,
        daysVacationFirstUse: false,
        daysVacationSecondUse: false,
        daysVacationThirdUse: false,
        daysOnVacation: ''
    });


    const [isReadOnly, setIsReadOnly] = useState(true);

    const calculateEndDate = (startDate, days) => {
        if (!startDate) return '';

        const date = new Date(startDate);
        date.setUTCDate(date.getUTCDate() + days);
        return date.toISOString().split('T')[0];
    };

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

            checkbox: () => {
                const daysMap = {
                    daysVacationFull: 30,
                    daysVacationFirstUse: 14,
                    daysVacationSecondUse: 5,
                    daysVacationThirdUse: 5,
                };
                const days = daysMap[name] ?? 5;

                setIsReadOnly(name === 'daysVacationFull' && checked);
                setFormData(prev => ({
                    ...prev,
                    daysVacationFull: false,
                    daysVacationFirstUse: false,
                    daysVacationSecondUse: false,
                    daysVacationThirdUse: false,
                    [name]: checked,
                    daysOnVacation: checked ? days : '',
                    endDate: checked ? calculateEndDate(prev.startDate, days) : '',
                }));
            },

            startDate: () => {
                setFormData(prev => ({
                    ...prev,
                    startDate: value,
                    endDate: prev.daysOnVacation
                        ? calculateEndDate(value, prev.daysOnVacation)
                        : '',
                }));
            },

            daysOnVacation: () => {
                const days = Math.min(Math.max(Number(value), 0), 60);
                setFormData(prev => ({
                    ...prev,
                    daysOnVacation: days,
                    endDate: calculateEndDate(prev.startDate, days),
                }));
            },

            default: () => {
                setFormData(prev => ({ ...prev, [name]: value }));
            },
        };

        const key = type === 'checkbox' ? 'checkbox' : name;
        (handlers[key] ?? handlers.default)();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
    };

    return (
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
                            <input
                                type="number"
                                id="re"
                                name="re"
                                value={formData.re}
                                onChange={handleChange}
                                placeholder="Digite seu RE"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="employee">Funcionário</label>
                            <input
                                className='readOnly'
                                type="text"
                                id="employee"
                                name="employee"
                                value={formData.employee}
                                readOnly
                                placeholder="Nome será preenchido automaticamente"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="startDatePeriod">Aquisitivo Inicial</label>
                            <input
                                className='readOnly'
                                type="date"
                                id="startDatePeriod"
                                name="startDatePeriod"
                                value={formData.startDatePeriod}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDatePeriod">Aquisitivo Final</label>
                            <input
                                className='readOnly'
                                type="date"
                                id="endDatePeriod"
                                name="endDatePeriod"
                                value={formData.endDatePeriod}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Data de Início</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate">Data de Retorno</label>
                            <input
                                className='readOnly'
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="daysOnVacation">Dias de Férias</label>
                            <input
                                className={isReadOnly ? 'readOnly' : ''}
                                type="number"
                                id="daysOnVacation"
                                name="daysOnVacation"
                                value={formData.daysOnVacation || ''}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                                min={5}
                            />
                        </div>

                    </div>





                    <div className="form-row">
                        <div className="form-group-checkbox">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    name="daysVacationFull"
                                    checked={formData.daysVacationFull}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                Férias Completas (30 dias)
                            </label>
                        </div>

                        <div className="form-group-checkbox">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    name="daysVacationFirstUse"
                                    checked={formData.daysVacationFirstUse}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                1ª fruição (minímo 14 dias)
                            </label>
                        </div>

                        <div className="form-group-checkbox">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    name="daysVacationSecondUse"
                                    checked={formData.daysVacationSecondUse}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                2ª fruição (minímo 5 dias)
                            </label>
                        </div>

                        <div className="form-group-checkbox">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    name="daysVacationThirdUse"
                                    checked={formData.daysVacationThirdUse}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                3ª fruição (minímo 5 dias)
                            </label>
                        </div>



                    </div>


                    <div className="form-group">


                        <div className='signature-area'>

                            <div className="signature-wrapper">
                                <Signature
                                    ref={signatureRef}
                                    width={500}
                                    height={200}
                                    instructions="Assine no campo acima"
                                />
                            </div>

                            <div className='signature-area-image'>
                                <img ref={imgRef} className="image full-width" />
                            </div>
                        </div>




                        <input type="button" value="Reiniciar" onClick={reset} />
                        <input
                            type="button"
                            value="Salvar assinatura"
                            onClick={onGetImage}
                        />


                    </div>



                    <button type="submit" className="form-btn-submit">Enviar Solicitação</button>
                </form>
            </div >
        </main >
    );
}

export default Form;