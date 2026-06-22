import '../SupervisorForms/SupervisorForms.css'
import notFoundImg from '/img/not-found-form.avif';
import FormsPending from './Guides/Pending.jsx';
import FormsApproved from './Guides/Approved.jsx';
import EmployeeCard from './EmployeeCard.jsx';
import { useState } from 'react';



const ListFormsPage = [
    { name: "Pendentes", title: "pending" },
    { name: "Enviados", title: "sent" }
];


export default function SupervisorForms({ forms }) {

    const [listForm, setListForm] = useState(ListFormsPage[0].title);

    return (
        <>
            <main className='container-listForms'>

                <div className='listForms-pages'>
                    {ListFormsPage.map((btn) => (
                        <button className={`listForms-pages-btn ${listForm === btn.title ? 'active' : ''}`} key={btn.title} onClick={() => setListForm(btn.title)}>{btn.name}</button>
                    ))}
                </div>

                <div className="background-forms">
                    {listForm === 'pending' ? <FormsPending forms={forms} /> : <FormsApproved />}
                </div>
            </main>

        </>
    )
}

export function FormCard({ forms }) {
    return (
        <>
            <div className='container-forms'>
                {forms.map((form) => (<EmployeeCard key={form.date} form={form} photoUrl={'/img/1835.avif'} />))}
            </div>
        </>
    )
}