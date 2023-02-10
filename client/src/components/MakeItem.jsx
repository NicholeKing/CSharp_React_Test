import { useState } from "react";
import axios from 'axios';

const MakeItem = props => {
    const [item, setItem] = useState({
        name: "",
        isComplete: false
    });
    const [errors, setErrors] = useState(null);

    const onChangeHandler = e => {
        setItem({...item, [e.target.name]: e.target.value})
    }

    const formReset = () => {
        setItem({
            name: "",
            isComplete: false
        })
    }

    const formHandler = async e => {
        e.preventDefault();
        try {
            const additem = await axios({
                url: "https://localhost:7205/api/todoitems",
                method: "post",
                data: item,
                contentType: "application/json"
            });
            props.triggerUpdate();
            formReset();
            setErrors(null);
        } catch (err)
        {
            setErrors(err.response.data.errors.Name);
        }
    }

    const errorStyle = {
        color: "red"
    };

    return(
        <>
        <h2>Add a Task</h2>
        <form onSubmit={formHandler}>
            <div>
                <label htmlFor="name">Task:</label>
                <input type="text" name="name" onChange={onChangeHandler} value={item.name} />
                <div>
                    {errors ? <span style={errorStyle}>{errors}</span> : ""}
                </div>
            </div>
            <div>
                <input type="submit" value="Add Task" />
            </div>
        </form>
        </>
    );
}

export default MakeItem;