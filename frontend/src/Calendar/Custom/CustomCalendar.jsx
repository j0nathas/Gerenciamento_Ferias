import { editModeOut } from '../CalendarReact.jsx';
import { formatarNome } from '../../utils/profileUtils.js'

export const CustomTaskListHeader = ({ headerHeight, rowWidth, fontFamily, fontSize }) => (
    <div
        className={`gantt-list-header ${editModeOut ? 'editMode' : ''}`}
        style={{ height: headerHeight, width: rowWidth, fontFamily, fontSize }}
    >
        Colaborador
    </div>
);

export const CustomTaskListTable = ({ rowHeight, rowWidth, fontFamily, fontSize, tasks, selectedTaskId, setSelectedTask, }) => (
    <div style={{ fontFamily, fontSize }}>
        {tasks.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task.id)} className={`gantt-list-row ${task.id === selectedTaskId ? editModeOut ? 'editModeSelected' : 'selected' : ''}`}
                style={{ height: rowHeight, width: rowWidth }}>
                <span>{formatarNome(task.name)}</span>
                {task.photo && (
                    <figure className="calendar-img-profile">
                        <img
                            src={task.photo}
                            alt={`Foto de ${name}`}
                            loading="lazy"
                            decoding="async"
                        />
                    </figure>
                )}
            </div>
        ))}
    </div>
);


export const CustomTooltip = ({ task, fontSize, fontFamily }) => {
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