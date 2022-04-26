import { useState } from "react";
import TaskColumn from "../tasks-column";
import './style.css';
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { v4 as uuidv4 } from 'uuid' // Me ayudan a generar id unicos


// Constante de la inicializacion del boardlist con 3 columnas
const initialBoard = [

    {
        id: uuidv4(),
        name: 'To do',
        status: 'TODO',
        showClearAll: false, // el showClearAll eliminiará todos los cards de la columna
        tasks: [] // tasks es el contenedor de las cards
    },

    {
        id: uuidv4(),
        name: 'In progress',
        status: 'INPROGRESS',
        showClearAll: false, // el showClearAll eliminiará todos los cards de la columna
        tasks: [] // tasks es el contenedor de las cards
    },

    {
        id: uuidv4(),
        name: 'Done',
        status: 'DONE',
        showClearAll: true, // el showClearAll eliminiará todos los cards de la columna
        tasks: [] // tasks es el contenedor de las cards
    },
];



// Formato de la fecha y hora
let date = new Date();

let day = date.getDay();

let mes = date.toLocaleString('default', { month: 'short' });

let month  = mes.replace(/^\w/, (c) => c.toUpperCase());



export default function BoardContainer(){

    // Arrow function del drag and drop
    const onDragEnd = result => {
        
            const { source, destination } = result

            if (source.droppableId !== destination.droppableId) {

                        const sourceColIndex = boardList.findIndex(e => e.id === source.droppableId)
                        const destinationColIndex = boardList.findIndex(e => e.id === destination.droppableId)

                        const sourceCol = boardList[sourceColIndex]
                        const destinationCol = boardList[destinationColIndex]

                        const sourceTask = [...sourceCol.tasks]
                        const destinationTask = [...destinationCol.tasks]

                        const [removed] = sourceTask.splice(source.index, 1)
                        destinationTask.splice(destination.index, 0, removed)

                        boardList[sourceColIndex].tasks = sourceTask
                        boardList[destinationColIndex].tasks = destinationTask

                        updateBoard(boardList)
                
            }
        
    }


    // Constante que me ayudra a realizar el filtro de busqueda
    const [originalBoard, updateOriginalBoard] = useState(initialBoard); 


    // Constante que inicializa el board list con las 3 columnas
    const [boardList , updateBoard] = useState(initialBoard);


    // Otra variable que necesita el es counter para enumerar los ids de las tasks
    const [idCounter, updateCounter] = useState(0);



    // Arrow function para crear una task
    // a esta funcion le pasare los parametros que yo le estoy pasando desde la columna, le pasare el taskname y el indice
    const createTask = (taskName, i) => { 

        // taskname.- es el contenido de la task o card
        // i - es el indice de la columna donde voy a introducir la tasks
        const newCounter = idCounter+1;
        updateCounter(newCounter);
        const task = {
            name: taskName,
            creationDate: new Date(),
            id: newCounter,
            idDropAndDrag: uuidv4()
        };

        // luego de crear la tarea, debo meterlo en el array de la columna i
        boardList[i].tasks.push(task);


        // Actualizo el board clonando el array 
        updateBoard([...boardList]);


        // Cuando quiera actualizar este board hago el updateBoard y el update del OriginalBoard, cuando cree una task
        updateOriginalBoard([...boardList]);
  
    }


    // Constante para borrar una task
    const deleteTask = (idtask, idColumn)=>{
    
        // idtak .- me ayudara a identificar el id de la task que quiero borrar
        // idColumn .- me ayudara a identificar el id de la columna de donde borrare la task

        const indexTaskToDelete = boardList[idColumn].tasks.findIndex( (e) => e.id === idtask  );

        boardList[idColumn].tasks.splice(indexTaskToDelete,1);
        
        updateBoard([...boardList]);

    }


    // Arrow function para borrar todos los tasks de una columna
    const deleteAllTasks = (idColumn) => {

        const arraytasks = boardList[idColumn].tasks;
        
        boardList[idColumn].tasks.splice(0,arraytasks.length);
        
        updateBoard([...boardList]);
       
    }
  

    // El filterTask es una funcion que le entra el evento,  hay que hacer un foreach
    const filterTask = (e) => {
        // Tengo que recorrer las columnas, y tengo que decir que la columna sea igual a un filter de las columnas
        // con un map devuelvo un nuevo array, y ese array tiene un objeto clonado, tanto el array es diferente como los objetos
        const filteredArray = originalBoard.map( c => {
            const column = {...c}
            column.tasks = column.tasks.filter(t => t.name.toLowerCase().includes(e.target.value.toLowerCase()) )
            return column
        })

        // ahora necesito actualizar el boardLista para que se repinte
        updateBoard(filteredArray);
    }
    
    

    return(
        <main> 
            
            <section className="version_updated_search__container">

                    <section className="version10_updatedOnDate__container">

                            <div className="text_version10">Version 1.0</div>

                            <div className="texto_date">Updated on {day} {month} </div>
                            
                    </section>

                {/* ---------------------------------------------------------------- */}

                    <section className="search_container">

                            <Paper component="form" sx={{ height:'25px' , p: '1px 2px', display: 'flex', alignItems: 'center', width:'40vw'  }}  >
                                    
                                    <SearchIcon sx={{ pl:'3px'}}/>

                                    <InputBase onChange={filterTask}  sx={{ ml: 1, flex: 1, fontSize:{ xs:'x-small', sm:'medium' } }}  placeholder="Filter cards"  inputProps={{ 'aria-label': 'search google maps' }} />

                            </Paper>

                    </section>    
                
            </section>

    {/* --------------------------------------------------------------------------------------------------------- */}    

            <DragDropContext onDragEnd={onDragEnd}>

                        <section className="columns__container">
                            {
                                
                                    boardList.map( (c,i) => 
                                            (
                                    
                                                <TaskColumn 
                                                        key={i} 
                                                        llave={c.id} 
                                                        className="column__container" 
                                                        indexColumn={i} 
                                                        onTaskCreation={createTask}
                                                        onTaskDelete={deleteTask} 
                                                        onTasksDeleteAll={ deleteAllTasks } 
                                                        infoColumn={c} />

                                            ) 
                            

                                    )
                                
                            }
                        
                        </section>
                               
            </DragDropContext>          

        </main>
    )
}