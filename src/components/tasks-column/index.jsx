// Estilo a la hora de pintar cada columna
// todo lo definido en el componente task-column es lo que contendra cada columna

import { useState } from "react";
import Task from "../task/indesx";
import './style.css';
import AddIcon from '@mui/icons-material/Add';
import { Droppable } from 'react-beautiful-dnd';


// TaskColumn es un hijo, debo recibir la informacion del padre, para recbir informacion del padre uso props
export default function TaskColumn(props){
    

    // Me voy a crear una variable de estado para poder hacer aparecer y desaparecer el formulario mediante el uso de un booleano
    const [ isTaskCreation, showCreationForm ] = useState(false);


    // Me voy a crear una variable de estado para poder hacer habilitar o desabilitar el boton del formulario Add
    const [ buttonAddEnable, updateButtonAddEnable ] = useState(false);


    // Constante para poder gestion el boton del simbolo mas
    const [ botonMas, upDateBotonMas ] = useState(true);


    // Funcion del submit del formulario
    const handleSubmit = (e) => {
        // Sirve para que el formulario se gestione correctamente
        e.preventDefault(); 

        // Debo obtener el valor de la task
        const taskName = e.target.taskName.value;

        // Llamo al evento onTaskCreation
        // Hace falta una prop para mandarle informacion del hijo al padre
        // Para poder agregar una task en una determinada columna, necesito el indice de la columna
        // el indice la columna me lo pasa el padre, en este caso es board-container

        // taskName .- Es el contenido de la task
        // indexColumn .- Es el index de la columna que me ayuda a identificar la columan donde agregare la task
        
        // El index de la columna me lo pasa el padre "board-container" y luego le paso el texto de la task del hijo al padre
        // mediante la prop ontaskCreation, los argumentos taskName y props.indexColumn me ayudaran a ejecutar la funcion 
        // onTaskCreation en el padre "board-container"
        props.onTaskCreation(taskName, props.indexColumn);
        e.target.taskName.value = ''; // vaciar el textarea
    }


    // Arrow function que borrará todos los task de una columna
    const deleteAllTasks = () => {
        props.onTasksDeleteAll(props.indexColumn);
    }


    // Arrow function que me ayudara a gestionar si el boton ADD esta disponible o no
    const enableAddButton = (text) => {
        let texto = ''; 
        texto = text.target.value;
        if ( (texto === '')){
            updateButtonAddEnable(false); // En false el boton ADD no esta disponible
        }else{
            updateButtonAddEnable(true); // En true el boton ADD si esta disponible
        }
    }


    // Funcion que me ayudara a borrar una task de una determinada columna
    function selectTaskId (idtask){

        // idTask .- Es el id de una determinada task
        // idColumn .- Es el id de una determinada columna de la que voy a borrar un determinado task
        const idColumn = props.indexColumn;
        props.onTaskDelete(idtask, idColumn);
    } 


    // Funcion que me ayudara a gestionar el icono +
    const botonMasEventos = () =>{
        showCreationForm(!isTaskCreation); // Me ayuda a mostrar u ocultar el formulario
        upDateBotonMas(false); // Oculta el boton del icono +
    }


    // Funcion que me ayudara gestionar el botón cancelar
    const botonCancelarEventos = (c) => { 
        showCreationForm(false);
        upDateBotonMas(true);
        updateButtonAddEnable(false);
    }


    // Funcion para gestionar el boton ADD
    const botonAddEventos = (a) => {
        showCreationForm(!isTaskCreation);
        upDateBotonMas(true);   
        updateButtonAddEnable(false); 
    }

   



    return(
        <Droppable  key={props.llave} droppableId={props.llave} >

            {
                
                (provided) =>  (

                <div className="columns" {...provided.droppableProps} ref={provided.innerRef} >

                            <div className="column_head"> 
                        
                                    <div className="column_container-lengh-nameOfColumn">

                                            {/* infoColumn es la informacion de la columna y me lo pasa el padre "board-container" */}
                                            <p> { props.infoColumn.tasks.length } </p>

                                            <p> { props.infoColumn.name } </p>

                                    </div>


                                    <div className="AddIcon-btnClearAll">   

                                            <AddIcon id={(props.infoColumn.name === 'Done') ? 'iconADD' : ''} className={ botonMas ? "iconADD-enable" : "iconADD-disable"} onClick={ botonMasEventos }/>

                                            <button type="button" className={ (props.infoColumn.name === 'Done') ? 'btn_ClearAll' : 'btn_ClearAll-hidden' } onClick={ deleteAllTasks } >Clear All</button>

                                    </div>

                            </div>
                
                            {/* ----------------------------------------------------------------------------------------------------------------------- */}

                            {/* FORMULARIO*/}

                            <div className={ isTaskCreation ? '' : 'task__form--hidden' }>

                                <form className="formulario_textArea-cancel-add" onSubmit={handleSubmit}>
                                        
                                        <textarea onChange={enableAddButton} className="area_text" required name="taskName" placeholder="Enter your task" ></textarea>

                                        <div className="buttons_cancel-add">

                                                <button className={ buttonAddEnable ?  "btn_add-enable" : "btn_add-disable" } type="submit" onClick={ botonAddEventos } >Add</button>

                                                <button type="reset" className="btn_cancel" onClick={ botonCancelarEventos } >Cancelar</button>

                                        </div>
                                        
                                </form>

                            </div>

                            {/* ----------------------------------------------------------------------------------------------------------------------- */}

                            {/* LISTA DE TASKS */}

                            <div className="list_container">

                                        {

                                            props.infoColumn.tasks.map( (task,index) =>
                                            
                                                        (
                                                        
                                                            <Task 
                                                            key={index} 
                                                            idForDraggable={task.idDropAndDrag} 
                                                            index={index} 
                                                            infoTask={task} 
                                                            status={props.infoColumn.status} 
                                                            selectTaskFromColum={ selectTaskId }  />
                                                            
                                                        )
                                                                   
                                                )
                                                
                                        }

                                        {provided.placeholder}

                            </div>

                </div>

                )

            }

        </Droppable>
        
    )

}