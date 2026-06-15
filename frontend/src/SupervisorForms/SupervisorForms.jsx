import '../SupervisorForms/SupervisorForms.css'
import notFoundImg from '/img/not-found-form.avif';
import FormsPending from './Guides/Pending.jsx';
import FormsApproved from './Guides/Approved.jsx';
import { useState } from 'react';


export const forms = [];

const ListFormsPage = [
    { name: "Pendentes", title: "pending" },
    { name: "Enviados", title: "sent" }
];


export default function SupervisorForms() {

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
                    {listForm === 'pending' ? <FormsPending /> : <FormsApproved />}
                </div>
            </main>

        </>
    )
}