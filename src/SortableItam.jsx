import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useDndMonitor} from "@dnd-kit/core";

export function Item({item}) {

    return (
        item ? (<div className='item'>
            <span>{item.title}</span>
            <span>{item.completed ? 'completed' : 'not completed'}</span>
        </div>) : <div>Loading...</div>
    );
}

export default function SortableItem({item, activeItem}) {


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: item.id, data:{item} });

    const opacity = activeItem && (activeItem.id === item.id ? '.5' : '1')

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity:opacity,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='item--sortable'>
            <Item item={item}/>
        </div>
    );
}
