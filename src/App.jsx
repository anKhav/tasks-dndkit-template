import {useEffect, useState} from "react";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import Container from "./Container.jsx";

import './index.css'
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {Item} from "./SortableItam.jsx";


export default function App() {
    const [activeItem, setActiveItem] = useState(null);

    const [todo, setTodo] = useState()
    const [completed, setCompleted] = useState()
    useEffect(() => {
        setTodo([
            {
                id:1,
                title:'Title1',
                completed:false
            },
            {
                id:3,
                title:'Title3',
                completed:false
            }
        ])
        setCompleted([
            {
                id:2,
                title:'Title2',
                completed:true
            },
            {
                id:4,
                title:'Title4',
                completed:true
            }
        ])
    }, []);

    const handleDragEnd = (event) => {
        const {active, over} = event
        setActiveItem(null)
    }

    const handleDragOver = (event) => {
        const {active, over} = event
        setActiveItem(active.data.current.item)
        if (active.data.current && over.data.current) {
            const activeContainerId = active.data.current.sortable.containerId
            let overContainerId = over.data.current?.container?.id || over.data.current?.sortable?.containerId
            console.log(activeContainerId);
            console.log(overContainerId);

            if (activeContainerId === overContainerId) {
                if (active.id !== over.id) {
                    if (!active.data.current.item.completed) {
                        setTodo(todo => {
                            const oldIndex = todo.findIndex(item => item.id === active.id);
                            const newIndex = todo.findIndex(item => item.id === over.id);

                            return  arrayMove(todo, oldIndex, newIndex)
                        })
                    } else if (active.data.current.item.completed) {
                        setCompleted(completed => {
                            const oldIndex = completed.findIndex(item => item.id === active.id);
                            const newIndex = completed.findIndex(item => item.id === over.id);

                            return  arrayMove(completed, oldIndex, newIndex)
                        })
                    }
                }
            } else {
                setActiveItem(active.data.current.item)
                if (!activeItem.completed) {
                    setTodo(prevState => {
                        return  prevState.filter(el => el.id !== activeItem.id)
                    })
                    setCompleted(todo => {
                            const newArray = [...todo, {...activeItem, completed:true}]

                            const oldIndex = newArray.findIndex(item => item.id === active.id);
                            const newIndex = newArray.findIndex(item => item.id === over.id);

                            return arrayMove(newArray, oldIndex, newIndex)
                        }
                    )
                } else {
                    setCompleted(prevState => {
                        return  prevState.filter(el => el.id !== activeItem.id)
                    })
                    setTodo(completed => {
                            const newArray = [...completed, {...activeItem, completed:false}]

                            const oldIndex = newArray.findIndex(item => item.id === active.id);
                            const newIndex = newArray.findIndex(item => item.id === over.id);

                            return arrayMove(newArray, oldIndex, newIndex)
                        }
                    )
                }
            }
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <div className='app'>
            <DndContext
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                sensors={sensors}
                collisionDetection={closestCenter}
            >
                <>
                    { todo && <Container id='container-todo' title='Todo' items={todo} activeItem={activeItem}/> }
                    { completed && <Container id='container-completed' title='Completed' items={completed} activeItem={activeItem}/> }
                </>
                <DragOverlay>
                    {activeItem ? <Item item={activeItem}/> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );

}
