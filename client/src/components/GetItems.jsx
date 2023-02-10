import { useEffect, useState } from "react";
import axios from 'axios';

const GetItems = props => {
    const [allItems, setAllItems] = useState(null);
    useEffect(() => {
        axios.get("https://localhost:7205/api/todoitems")
            .then(res => setAllItems(res.data))
    }, [props.update])

    const deleteItem = async id => {
        try {
            const removeitem = await axios({
                url: `https://localhost:7205/api/todoitems/delete/${id}`,
                method: "post",
                ContentType: "application/json"
            });
            props.triggerUpdate();
        } catch (err)
        {
            console.log(err);
        }
    }

    const onChangeHandler = async item => {
        item.isComplete = !item.isComplete;
        try {
            const additem = await axios({
                url: `https://localhost:7205/api/todoitems/update/${item.id}`,
                method: "post",
                data: item,
                ContentType: "application/json"
            });
            props.triggerUpdate();
        } catch (err)
        {
            console.log(err);
        }
    }

    return(
        <>
        <h2>My Todo List</h2>
        {
            allItems ? allItems.map((item, i) => <div key={i}>
                <h3>{item.name} <input type="checkbox" name="isComplete" checked={item.isComplete} onChange={() => onChangeHandler(item)}/> <button onClick={() => deleteItem(item.id)}>Delete</button></h3>
            </div>)
            : <h3>Loading...</h3>
        }
        </>
    );
}

export default GetItems;