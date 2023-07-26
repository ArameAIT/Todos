import React, { useReducer, useState } from 'react'

function Todos() {
    const [inputValue, setInputValue] = useState("")
    // const [todos, setTodos] = useState([])

    let todosNum = 0
    const [todos, dispatchTodos] = useReducer((current, action) => {
       
        if (action.type == "Add") {
            return [...current, action.obj]
        } else if (action.type == "Checked") {
            return (
                current.map((todo) => {
                    return (
                        todo.id == action.todoID ? {
                            ...todo,
                            isDone: !todo.isDone
                        } : todo
                    )
                })
            )
        } else if (action.type == "Del") {
            return (
                current.filter((todo) => {
                    return !todo.isDone
                })
            )
        }
    }, [])
    todos.forEach((el)=> todosNum += 1)

    function inputHandle() { dispatchTodos({ type: "Add", obj: { id: Math.random(), text: inputValue, isDone: false } }) }

    function handleClick(id) { dispatchTodos({ type: "Checked", todoID: id }) }

    function forDelete() { dispatchTodos({ type: "Del" }) }

    return (
        <div>
            <div className='flex gap-5 flex-col justify-center items-center'>
                <label>Todos</label>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={inputHandle}>Add</button>
            </div>
            <div>
                {
                    todos.map((el) => {
                        return (
                            <div className='flex justify-center items-center gap-5' key={el.id}>
                                <input type="checkbox" checked={el.isDone} onChange={() => handleClick(el.id)} />
                                <p className='p-3'>{el.text}</p>
                            </div>
                        )
                    })
                }
                <div>
                    {todos.length > 0 ?
                        <>
                            <button onClick={forDelete}>Delete</button>
                        </>
                        : ""}
                </div>
                <div className='p-3'>
                    <p>
                        Todos : {todosNum}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Todos