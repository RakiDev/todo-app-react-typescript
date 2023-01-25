import { FC, useState } from "react";
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { AiFillSave } from 'react-icons/ai';

interface TaskPropsInterface {
    id: number
    value: string
    onDelete: (id: number) => void;
    modTaskValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const Task: FC<TaskPropsInterface> = ({ id, value, onDelete, modTaskValue }) => {
    const [fieldValue, setFieldValue] = useState<string>(value);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [minHeight, setMinHeight] = useState<number>(50);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        const paddingTop = parseInt(getComputedStyle(e.target).getPropertyValue('padding-top'));
        const paddingBottom = parseInt(getComputedStyle(e.target).getPropertyValue('padding-bottom'));
        const verticalPadding = paddingTop + paddingBottom;

        e.target.style.height = Math.max(e.target.scrollHeight - verticalPadding, minHeight) + 'px';
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
            <textarea
                value={fieldValue} 
                onChange={handleChange} 
                disabled={isDisabled}
                spellCheck={false}
                id="focus-input"
                style={{ minHeight: minHeight }}
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