
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItam.jsx";



export default function Container({id, title, items, activeItem}) {

    const { setNodeRef } = useDroppable({
        id,
        data:{container:{id}}
    });

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} className='container'>
                <h2 className='container__title' style={{backgroundColor:title === 'Todo' ? 'grey' : 'green'}}>{title}</h2>
                <div className='container__list'>
                    {items.map(item => (
                        <SortableItem key={item.id} item={item} activeItem={activeItem}/>
                    ))}
                </div>
            </div>
        </SortableContext>
    );
}
