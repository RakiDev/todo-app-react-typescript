import { FC, useState } from "react";
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { AiFillSave } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';

interface TaskPropsInterface {
    id: number
    value: string
    onDelete: (id: number) => void;
    modTaskValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const Task: FC<TaskPropsInterface> = ({ id, value, onDelete, modTaskValue }) => {
    const [fieldValue, setFieldValue] = useState<string>(value);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newValue = e.target.value;
        setFieldValue(newValue);
    }

    function arrCopy(array: string[], index: number, value: string): string[] {
        const newArray = array.map((val, i) => {
            if (i === index) return value;
            return val;
        });
        return newArray;
    }

    function handleSave(): void {
        modTaskValue((previousVal) => arrCopy(previousVal, id, fieldValue))
    }

    return (
        <li id={`${id}`} className="task_item_li">
            <TextareaAutosize
                value={fieldValue} 
                onChange={handleChange} 
                disabled={isDisabled}
                spellCheck={false}
                id="focus-input"
            />
            <div className="task_buttons_container">
                <button onClick={() => {handleSave(); setIsDisabled(true)}} className="taskbutton onpressbutton onhoverbutton">
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