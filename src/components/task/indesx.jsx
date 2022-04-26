// Estilo de un unico componente task

import { useState } from "react"
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Draggable } from 'react-beautiful-dnd';


export default function Task(props){


    const[idTask, updateIdTask] = useState(props.infoTask.id);


    function selectTaskForDelete (idTask) {
        props.selectTaskFromColum(idTask);
    }



    return(

            <Draggable key={props.idForDraggable}  draggableId={props.idForDraggable} index={props.index} >

                    {   
                    
                        (provided, snapshot) =>

                            (

                                <div className="task"   ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        style={{...provided.draggableProps.style, opacity: snapshot.isDragging ? '0.5' : '1' }}  >

                                            <div className="status-container">

                                                    <div className="icon-status-container">

                                                        { 
                                                            props.status === 'DONE' ? 

                                                                    <CheckCircleOutlineOutlinedIcon sx={{ color: 'red',  fontSize:'14px'}}/>             :
                                                                    <PendingOutlinedIcon sx={{ color: 'green',  fontSize:'15px'}}></PendingOutlinedIcon>
                                                        }
                                    
                                                    </div>     

                                                    <div className="text-date-container">
                                                        
                                                            <div className="text"> { props.infoTask.name } </div>
                                                            <div className="date" > #{props.infoTask.id} created on {props.infoTask.creationDate.toLocaleString()} </div>

                                                    </div>

                                            </div>

                                            <div className="borrar-container">
                                                
                                                    <DeleteIcon sx={{ color: '#636468',  fontSize:'18px'}} onClick={ () => selectTaskForDelete(idTask) } />

                                            </div>
                                                
                                </div>

                            )
                    }

            </Draggable>

    )
    
}