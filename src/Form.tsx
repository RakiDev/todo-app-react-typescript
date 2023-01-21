import { EventHandler, FC, useState } from "react";
import Task from './Task';
import { TiPlus } from 'react-icons/ti';
import { nanoid } from "nanoid";

const Form: FC = () => {
    const [task, setTask] = useState<string>("");
    const [taskItems, setTaskItems] = useState<string[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const newValue = e.target.value;
        setTask(newValue);
    }

    function addTask(): void {
        if (task.length === 0 || task === '') return;
        setTaskItems((prevTaskItems) => [...prevTaskItems, task]);
        setTask("");
    }

    function deleteTask(id: number): void {
        setTaskItems((prevTaskItems) => prevTaskItems.filter((value, index) => index !== id));
    }

    function modifyTask(id: number, taskMod: string): void {
        setTaskItems((prevTaskItems) => {
            prevTaskItems[id] = taskMod
            return prevTaskItems;
        });
    }

    console.log(taskItems)
    console.log(task)
    return (
        <main className="main_frame">
            <div className="form">
                <input 
                    type="text" 
                    className="form_input" 
                    value={task} 
                    onChange={handleChange}
                    placeholder="Add New Task..."
                />
                <button className="form_button" onClick={addTask}>
                    <TiPlus />
                </button>
            </div>

            <div className="task_items_list">
                <ul>
                    {taskItems.map((item) => 
                        <Task
                            id={taskItems.indexOf(item)}
                            key={nanoid(10)}
                            onDelete={deleteTask}
                            modTaskValue={modifyTask}
                            value={item}
                        />
                    )}
                </ul>
            </div>
        </main>
    );
}

export default Form;