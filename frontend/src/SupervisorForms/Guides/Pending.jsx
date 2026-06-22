
import { FormCard } from '../SupervisorForms';

export default function FormsPending({ forms = [] }) {
    return (
        <>
            {forms.length === 0 ? (
                <div className='container-not-found'>
                    <img src="./img/not-found-form.avif" className='w-90' alt="" />
                    <h1 className='not-found-message'>Nenhum formulário novo encontrado!</h1>
                </div>
            ) : (
                <FormCard forms={forms} />
            )}
        </>
    )
}