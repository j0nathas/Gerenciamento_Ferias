import { useState, useEffect, useRef } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { employers } from '../App/App';
import ProInfo from '../HomePage/ProInfo/ProInfo';
import './CalendarReact.css';
import ViewIcon from '/img/view.svg?react';
import EditIcon from '/img/edit.svg?react';
import ZoomInIcon from '/img/zoom-in.svg?react';
import ZoomOutIcon from '/img/zoom-out.svg?react';
import PlusIcon from '/img/plus.svg?react';
import useDragScroll from './DragScroll/UseDragScroll.jsx';
import AdddEmployee from './AddEmployee/AddEmployee.jsx';
import { CustomTaskListHeader, CustomTaskListTable, CustomTooltip } from './Custom/CustomCalendar.jsx'
export let editModeOut = null;

const VIEWS = [
    { label: 'Dia', value: ViewMode.Day, columnWidth: 65 },
    { label: 'Semana', value: ViewMode.Week, columnWidth: 100 },
    { label: 'Mês', value: ViewMode.Month, columnWidth: 200 },
    { label: 'Ano', value: ViewMode.Year, columnWidth: 500 },
];

function getPastelColorFromRE(re) {
    let hash = 0;

    for (let i = 0; i < String(re).length; i++) {
        hash = String(re).charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;

    return `hsl(${hue}, 70%, 70%)`;
}

export default function CalendarReact() {

    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [view, setView] = useState(VIEWS[2]);
    const calendarRef = useRef(null);
    const controlsRef = useRef(null);
    const [ganttHeight, setGanttHeight] = useState(0);
    const ganttWrapperRef = useDragScroll();
    const [addEmployee, setAddEmployee] = useState(false);
    editModeOut = editMode;



    const handleTaskClick = (task) => {
        const employer = employers.find(e => String(e.re) === String(task.id.split('-')[0]));
        if (employer) setSelectedEmployer(employer);
    };

    function containerName(name, photo) {
        return (
            <>
                <div>
                    <p>{name}</p>
                    <img src={photo} width={20} height={20} alt="" />
                </div>
            </>
        )
    }

    const [employees, setEmployees] = useState(() => {
        const realTasks = employers
            .filter(e => e.startDate && e.endDate)
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((e, index) => ({
                start: new Date(e.startDate),
                end: new Date(e.endDate),
                name: e.name,
                photo: e.photo,
                id: `${e.re}-${index}`,
                type: 'task',
                progress: Math.min(100, Math.max(0,
                    (new Date() - new Date(e.startDate)) /
                    (new Date(e.endDate) - new Date(e.startDate)) * 100
                )),
                styles: {
                    progressColor: getPastelColorFromRE(e.re),
                    progressSelectedColor: getPastelColorFromRE(e.re),
                },
                isDisabled: false,
            }));

        for (let i = 0; realTasks.length < 30; i++) {
            realTasks.push({
                start: new Date(),
                end: new Date(),
                name: '',
                id: `${i}`,
                type: 'task',
                progress: 0,
                isDisabled: true,
                styles: {
                    backgroundColor: 'transparent',
                    backgroundSelectedColor: 'transparent',
                    progressColor: 'transparent',
                    progressSelectedColor: 'transparent',
                },
            });
        }
        return realTasks;
    });

    return (
        <>
            <div className="calendar-wrapper" ref={calendarRef}>
                <div className={`calendar-view ${editMode ? 'editMode' : ''}`} ref={controlsRef}>
                    <div className="calendar-view-toggle">
                        {VIEWS.map(v => (
                            <button
                                key={v.value}
                                onClick={() => setView(v)}
                                className={`card-sectors-select-button ${view.value === v.value ? 'active' : ''} ${editMode && view.value === v.value ? 'editMode' : ''}`}
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>

                    <div className={`calendar-view-toggle`}>

                        {
                            editMode && (
                                <div className={`edit-container ${addEmployee ? 'activeEdit' : ''}`}>
                                    <button className={`card-sectors-select-button ${addEmployee ? 'activeEdit' : ''}`} onClick={() => setAddEmployee((prev) => !prev)}>
                                        <PlusIcon width={15} height={15} />
                                        Simular Colaborador
                                    </button>
                                    {addEmployee ? <AdddEmployee setAddEmployee={setAddEmployee} setEmployees={setEmployees} /> : ''}
                                </div>
                            )
                        }
                        <button className={`card-sectors-zoom-button ${editMode ? 'editMode' : ''}`} onClick={() => setView(prev => ({ ...prev, columnWidth: prev.columnWidth + 10 }))}>
                            <ZoomInIcon width={20} height={20} />
                        </button>
                        <button className={`card-sectors-zoom-button ${editMode ? 'editMode' : ''}`} onClick={() => setView(prev => ({ ...prev, columnWidth: Math.max(10, prev.columnWidth - 10) }))}>
                            <ZoomOutIcon width={20} height={20} />
                        </button>

                        <button
                            onClick={() => setEditMode(prev => !prev)}
                            className={`card-sectors-select-button ${editMode ? 'editMode' : ''}`}
                        >
                            {editMode
                                ? <EditIcon width={25} height={25} />
                                : <ViewIcon width={25} height={25} />}
                        </button>

                    </div>
                </div>

                <div className="gantt-wrapper" ref={ganttWrapperRef}>
                    <Gantt
                        locale='pt-br'
                        tasks={employees}
                        viewMode={view.value}
                        barFill={65}
                        rowHeight={75}
                        ganttHeight={ganttHeight}
                        onClick={editMode ? null : handleTaskClick}
                        TaskListHeader={CustomTaskListHeader}
                        TaskListTable={CustomTaskListTable}
                        todayColor={editMode ? "#c4deff6c" : "#cacadb6c"}
                        columnWidth={view.columnWidth}
                        handleWidth={editMode ? 8 : 0}
                        onDateChange={editMode
                            ? (task) => setEmployees(prev => prev.map(t => t.id === task.id ? task : t))
                            : null}
                        barProgressColor={editMode ? "rgb(130, 182, 250)" : "rgb(108,111,156)"}
                        barProgressSelectedColor={editMode ? "rgb(70, 109, 177)" : "rgb(70, 78, 197)"}
                        barBackgroundSelectedColor={editMode ? "rgb(159, 196, 238)" : "rgb(144, 151, 255)"}
                        TooltipContent={CustomTooltip}
                    />
                </div>

                {selectedEmployer && (
                    <ProInfo
                        re={selectedEmployer.re}
                        name={selectedEmployer.name}
                        photo={selectedEmployer.photo}
                        shift={selectedEmployer.shift}
                        startDate={selectedEmployer.startDate}
                        endDate={selectedEmployer.endDate}
                        returnDate={selectedEmployer.returnDate}
                        aquisitivo_inicio={selectedEmployer.aquisitivo_inicio}
                        aquisitivo_Final={selectedEmployer.aquisitivo_Final}
                        sector={selectedEmployer.sector}
                        state={selectedEmployer.state}
                        onClose={() => setSelectedEmployer(null)}
                    />
                )}
            </div>
        </>
    );
}