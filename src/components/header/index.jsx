import './style.css';
import InsertChartIcon from '@mui/icons-material/InsertChart';


export default function Header(){
    
    return (

        <header className='header'>

                <img className='neoland_logo'></img>

                <div className='version_container'>

                    <InsertChartIcon className='iconChart'/>
                    <p className='paragragh_version'>Version 1.0</p>
                
                </div>

        </header>
    )
}