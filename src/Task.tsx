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
        if (newValue.length === 0 || newValue === '') return;
        setFieldValue(newValue);
    }

    return (
        <li id={`${id}`} className="task_item_li">
            <input type="text"
                value={fieldValue} 
                onChange={handleChange} 
                disabled={isDisabled}
            />
            <button onClick={() => {modTaskValue(id, fieldValue); setIsDisabled(true)}}>
                <AiFillSave />
            </button>
            <button onClick={() => setIsDisabled((prev) => !prev)} className="taskbutton">
                <BsPencilSquare />
            </button>
            <button onClick={() => onDelete(id)}>
                <BsTrash />
            </button>
        </li>
    );
}

export default Task