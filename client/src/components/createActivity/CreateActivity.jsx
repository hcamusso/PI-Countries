import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import {postActivity,getCountries} from '../../actions/index';

export default function CreateActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries)
    
    const [input, setInput] = useState({
        name: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        countries:[]
    })
//manejadores de los inputs
    function handleChange(evento) {
        setInput({
            ...input,
            [evento.target.name] : evento.target.value
        })
        console.log(input)
    }
//manejador del ckeckbox
    function handleCheck(evento){
        if(evento.target.checked){
            setInput({
                ...input,
                temporada: evento.target.value
            })
        }
    }
//manejador del select
    function handleSelect(evento){
        setInput({
            ...input,
            countries: [...input.countries,evento.target.value]
        })
        console.log('despache crear actividad>',input)
    }
//manejador de los errores

//manejador del submit
    function handleSubmit(evento){
        evento.preventDefault();
        dispatch(postActivity(input))
        alert("Activity created!!!")
        setInput({
            name: "",
            dificultad: "",
            duracion: "",
            temporada: "",
            countries:[]
        })
        //redijirnos al home
        history.push('/home')
    }

    useEffect(()=> {
        dispatch(getCountries());
    },[dispatch]);

    return(
        <div>
            <Link to= '/home'><button>Back to home</button></Link>
            <h1>Create the tourist activity</h1>
            <form onSubmit={(evento)=>handleSubmit(evento)}>
                <div>
                    <label>Tourist activity:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Difficulty:</label>
                    <input
                    type= "number"
                    value= {input.dificultad}
                    name= "dificultad"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Duration:</label>
                    <input
                    type= "number"
                    value= {input.duracion}
                    name= "duracion"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Season:</label>
                    <label> <input type= "checkbox" value= "Verano" name= "Verano" onChange={(evento)=>handleCheck(evento)}/>Summer </label>
                    <label> <input type= "checkbox" value= "Otoño" name= "Otoño" onChange={(evento)=>handleCheck(evento)}/>Autumn </label>
                    <label> <input type= "checkbox" value= "Invierno" name= "Invierno" onChange={(evento)=>handleCheck(evento)}/>Winter </label>
                    <label> <input type= "checkbox" value= "Primavera" name= "Primavera" onChange={(evento)=>handleCheck(evento)}/>Spring </label>
                </div>
                
                <select onChange={(evento) => handleSelect(evento)}>
                    {allCountries.map((country) => (
                        <option value={country.idCountry}>{country.name}</option>
                    ))}
                </select>
                <ul><il>{input.countries.map(el => el + ", ")}</il></ul>
                <button type='submit'>Create Tourist Activity</button>
            </form>
        </div>
    )
}