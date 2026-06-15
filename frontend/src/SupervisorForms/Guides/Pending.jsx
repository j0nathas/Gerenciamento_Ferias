import { forms } from '../SupervisorForms'

export default function FormsPending() {
    return (
        <>
            {forms.length === 0 ? (
                <div className='container-not-found'>
                    <img src="./img/not-found-form.avif" className='w-90' alt="" />
                    <h1 className='not-found-message'>Nenhum formulário novo encontrado!</h1>
                </div>
            ) : (
                forms.map((form) => (
                    <div key={form.id}>
                        <p>{form.employee}</p>
                        <p>{form.re}</p>
                        <p>{form.vacationType}</p>
                        <p>{form.startDate}</p>
                        <p>{form.daysOnVacation}</p>
                    </div>
                ))
            )}
        </>
    )
}