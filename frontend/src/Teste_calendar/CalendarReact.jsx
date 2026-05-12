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

const CustomTaskListHeader = ({ headerHeight, rowWidth, fontFamily, fontSize }) => (
    <div
        className="gantt-list-header"
        style={{ height: headerHeight, width: rowWidth, fontFamily, fontSize }}
    >
        Colaborador
    </div>
);

const CustomTaskListTable = ({
    rowHeight, rowWidth, fontFamily, fontSize,
    tasks, selectedTaskId, setSelectedTask,
}) => (
    <div style={{ fontFamily, fontSize }}>
        {tasks.map(task => (
            <div
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className={`gantt-list-row ${task.id === selectedTaskId ? 'selected' : ''}`}
                style={{ height: rowHeight, width: rowWidth }}
            >
                {task.name}
            </div>
        ))}
    </div>
);

const CustomTooltip = ({ task, fontSize, fontFamily }) => {
    const start = task.start.toLocaleDateString('pt-BR');
    const end = task.end.toLocaleDateString('pt-BR');

    return (
        <div className="gantt-tooltip" style={{ fontFamily, fontSize }}>
            <p className="gantt-tooltip__title">{task.name}</p>
            <p className="gantt-tooltip__date-start"><strong>Início:</strong> {start}</p>
            <p className="gantt-tooltip__date-end"><strong>Fim:</strong> {end}</p>
            <div className="gantt-tooltip__progress-track">
                <div
                    className="gantt-tooltip__progress-fill"
                    style={{ width: `${Math.round(task.progress)}%` }}
                />
            </div>
            <p className="gantt-tooltip__progress-label">{Math.round(task.progress)}%</p>
            <p className="gantt-tooltip__progress-label">
                {Math.round((task.end - task.start) / (1000 * 60 * 60 * 24) + 1)} dias
            </p>
        </div>
    );
};

const VIEWS = [
    { label: 'Dia', value: ViewMode.Day, columnWidth: 65 },
    { label: 'Semana', value: ViewMode.Week, columnWidth: 100 },
    { label: 'Mês', value: ViewMode.Month, columnWidth: 200 },
    { label: 'Ano', value: ViewMode.Year, columnWidth: 500 },
];

export default function CalendarReact() {

    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [view, setView] = useState(VIEWS[1]);
    const calendarRef = useRef(null);
    const controlsRef = useRef(null);
    const [ganttHeight, setGanttHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (calendarRef.current && controlsRef.current) {
                const available = calendarRef.current.clientHeight;
                const controls = controlsRef.current.offsetHeight;
                const gap = 10;
                const padding = 32;
                setGanttHeight(available - controls - gap - padding);
            }
        };

        const observer = new ResizeObserver(updateHeight);
        if (calendarRef.current) observer.observe(calendarRef.current);
        return () => observer.disconnect();
    }, []);

    const handleTaskClick = (task) => {
        const employer = employers.find(e => String(e.re) === String(task.id.split('-')[0]));
        if (employer) setSelectedEmployer(employer);
    };

    const [employees, setEmployees] = useState(() => {
        const realTasks = employers
            .filter(e => e.startDate && e.endDate)
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((e, index) => ({
                start: new Date(e.startDate),
                end: new Date(e.endDate),
                name: e.name,
                id: `${e.re}-${index}`,
                type: 'task',
                progress: Math.min(100, Math.max(0,
                    (new Date() - new Date(e.startDate)) /
                    (new Date(e.endDate) - new Date(e.startDate)) * 100
                )),
                isDisabled: false,
            }));

        for (let i = 0; realTasks.length < 14; i++) {
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
                <div className='calendar-view' ref={controlsRef}>
                    <div className="calendar-view-toggle">
                        {VIEWS.map(v => (
                            <button
                                key={v.value}
                                onClick={() => setView(v)}
                                className={`card-sectors-select-button ${view.value === v.value ? 'active' : ''}`}
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>

                    <div className="calendar-view-toggle">

                        <button className='card-sectors-zoom-button' onClick={() => setView(prev => ({ ...prev, columnWidth: prev.columnWidth + 10 }))}>
                            <ZoomInIcon width={20} height={20} />
                        </button>
                        <button className='card-sectors-zoom-button' onClick={() => setView(prev => ({ ...prev, columnWidth: Math.max(10, prev.columnWidth - 10) }))}>
                            <ZoomOutIcon width={20} height={20} />
                        </button>

                        <button
                            onClick={() => setEditMode(prev => !prev)}
                            className={`card-sectors-select-button ${editMode ? 'active' : ''}`}
                        >
                            {editMode
                                ? <EditIcon width={25} height={25} />
                                : <ViewIcon width={25} height={25} />}
                        </button>

                    </div>
                </div>

                <div className="gantt-wrapper">
                    <Gantt
                        locale='pt-br'
                        tasks={employees}
                        viewMode={view.value}
                        ganttHeight={ganttHeight}
                        onClick={editMode ? null : handleTaskClick}
                        TaskListHeader={CustomTaskListHeader}
                        TaskListTable={CustomTaskListTable}
                        todayColor={editMode ? "#cacadb6c" : "#cadbcf6c"}
                        columnWidth={view.columnWidth}
                        handleWidth={editMode ? 8 : 0}
                        onDateChange={editMode
                            ? (task) => setEmployees(prev => prev.map(t => t.id === task.id ? task : t))
                            : null}
                        barProgressColor={editMode ? "rgb(108, 111, 156)" : "rgb(108,156,119)"}
                        barProgressSelectedColor={editMode ? "rgb(70, 78, 197)" : "rgb(66, 99, 74)"}
                        barBackgroundSelectedColor={editMode ? "rgb(144, 151, 255)" : "rgb(163, 180, 167)"}
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