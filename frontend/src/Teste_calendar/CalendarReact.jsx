import { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { employers } from '../App/App';
import ProInfo from '../HomePage/ProInfo/ProInfo';
import './CalendarReact.css';

export default function CalendarReact() {

    let rgb = 1;

    const [selectedEmployer, setSelectedEmployer] = useState(null);

    const employees = employers
        .filter(e => e.startDate && e.endDate)
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .map(e => ({
            start: new Date(e.startDate),
            end: new Date(e.endDate),
            name: e.name,
            id: `${e.re}`,
            type: 'task',
            progress: Math.min(100, Math.max(0,
                (new Date() - new Date(e.startDate)) /
                (new Date(e.endDate) - new Date(e.startDate)) * 100
            )),
            isDisabled: false,
            hideChildren: false,
            styles: { progressColor: `rgb(108,156,119)`, progressSelectedColor: `rgb(66, 99, 74)` }
        }));

    const handleTaskClick = (task) => {
        const re = task.id;
        const employer = employers.find(e => String(e.re) === String(re));
        if (employer) setSelectedEmployer(employer);
    };

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


    const VIEWS = [
        { label: 'Dia', value: ViewMode.Day, columnWidth: 65 },
        { label: 'Semana', value: ViewMode.Week, columnWidth: 100 },
        { label: 'Mês', value: ViewMode.Month, columnWidth: 200 }
    ];


    const [view, setView] = useState(VIEWS[1]);

    return (
        <>
            <div className="calendar-wrapper">
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

                <div className="gantt-wrapper">
                    <Gantt
                        tasks={employees}
                        viewMode={view.value}
                        ganttHeight={0}
                        onClick={handleTaskClick}
                        TaskListHeader={CustomTaskListHeader}
                        TaskListTable={CustomTaskListTable}
                        todayColor="#cadbcf"
                        columnWidth={view.columnWidth}
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