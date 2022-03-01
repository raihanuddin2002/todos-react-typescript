import { useReducer, useRef } from 'react';

const Todos = () => {
    // Types
    type todo = {
        id: number;
        text: string;
    }
    interface actionType {
        removeId?: number
        type: string,
        text: string
    }

    // LOCAL STORAGE
    const fetchData: any = localStorage.getItem("todos");
    const todoList = JSON.parse(fetchData) || [];

    const todoReducer = (state: todo[], action: actionType): any => {
        switch (action.type) {
            case "ADD":
                localStorage.setItem('todos', JSON.stringify([...state, { id: state.length, text: action.text }]));
                return [...state, { id: state.length, text: action.text }];

            case "REMOVE":
                localStorage.setItem('todos', JSON.stringify(state.filter(({ id }) => id !== action.removeId)));
                return state.filter(({ id }) => id !== action.removeId);

            default:
                return [...state];
        }
    }
    const [state, todoDispatch] = useReducer(todoReducer, todoList);


    const inputRef = useRef<HTMLInputElement>(null);

    // ADD 
    const addRemove = (e: any, targetElement: any) => {
        if (inputRef.current) {
            todoDispatch({
                removeId: targetElement.id,
                type: e.target.name,
                text: inputRef.current.value
            });
            inputRef.current.value = '';
        }
    }

    return (
        <>
            <div className="container">
                <div className="row my-5">
                    <div className='col-12 text-center mb-3'>
                        <input ref={inputRef} className='w-50 form-control-lg me-1' type="text" placeholder='text' />
                        <button onClick={(e) => addRemove(e, 0)} name="ADD" className='btn-lg btn-success'>ADD</button>
                    </div>

                    <div className='col-12 text-center'>
                        {
                            todoList.map((element: any) => (
                                <div className="container">
                                    <div className="row">
                                        <div
                                            key={element.id}
                                            style={{ "background": 'lightGray' }}
                                            className="d-flex justify-content-between align-items-center py-2 rounded-2 mb-2">
                                            <h3>{element.text}</h3>
                                            <button onClick={(e) => addRemove(e, element)} name="REMOVE" className='btn btn-danger'>x</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todos;