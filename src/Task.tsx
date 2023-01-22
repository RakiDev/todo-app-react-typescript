import { FC, useState } from "react";
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { AiFillSave } from 'react-icons/ai';

interface TaskPropsInterface {
    id: number
    value: string
    onDelete: (id: number) => void;
    modTaskValue: (id: number, taskMod: string) => void;
}

const Task: FC<TaskPropsInterface> = ({ id, value, onDelete, modTaskValue }) => {
    const [fieldValue, setFieldValue] = useState<string>(value);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const newValue = e.target.value;
        setFieldValue(newValue);
    }

    return (
        <li id={`${id}`} className="task_item_li">
            <input type="text"
                value={fieldValue} 
                onChange={handleChange} 
                disabled={isDisabled}
                spellCheck={false}
                id="focus-input"
            />
            <div className="task_buttons_container">
                <button onClick={() => {modTaskValue(id, fieldValue); setIsDisabled(true)}} className="taskbutton onpressbutton onhoverbutton">
                    <AiFillSave />
                </button>
                <label id="labelbutton" htmlFor="focus-input" className="taskbutton onpressbutton onhoverbutton" onClick={() => setIsDisabled(false)}>
                    <BsPencilSquare />
                </label>
                <button onClick={() => onDelete(id)} className="taskbutton onpressbutton onhoverbutton">
                    <BsTrash />
                </button>
            </div>
        </li>
    );
}

export default Task