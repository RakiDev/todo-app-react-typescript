import { FC, useEffect, useState } from "react";
import Task from './Task';
import { TiPlus } from 'react-icons/ti';
import { nanoid } from "nanoid";

const getTaskItems = (): string[] | [] => {
    const items: string | null = localStorage.getItem('taskItems');
    if (items === null) return [];
    return JSON.parse(items);
}

const Form: FC = () => {
    const [task, setTask] = useState<string>("");
    const [taskItems, setTaskItems] = useState<string[]>(getTaskItems);

    useEffect(() => {
        localStorage.setItem('taskItems', JSON.stringify(taskItems))
        console.log(taskItems)
    }, [taskItems]);

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

    return (
        <main className="main_frame">
            <form onSubmit={(e) => e.preventDefault()} className="form">
                <input 
                    type="text" 
                    className="form_input" 
                    value={task} 
                    onChange={handleChange}
                    placeholder="Add New Task..."
                    spellCheck={false}
                />
                <button className="form_button" onClick={addTask}>
                    <input id="submitbutton" type="submit" value='' />
                    <TiPlus />
                </button>
            </form>

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