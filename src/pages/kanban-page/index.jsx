import React from "react";
import BoardContainer from "../../components/board-container";
import Header from "../../components/header";


export default function KanbanPage(){
    return(
        <React.Fragment>
            <Header></Header>
            <BoardContainer></BoardContainer>
            
        </React.Fragment>

    )
}