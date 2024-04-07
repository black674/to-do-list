// Mui Imports
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// React Imports
import { useState, useEffect, useMemo, useReducer } from 'react';

// Files Imports
import CardMession from './Todo';
import Reducer from '../Reducer/Reducer';

export default function CardContainer() {

    // Update Info
    const [Todos, dispatch] = useReducer(Reducer, [])

    function handelCheck(id) {
        dispatch({type: 'checked', payload: {id: id}})
    }
    function handelDelete(id) {
        dispatch({type:'deleted' , payload:{id:id}})
    }
    function handelEdit(id,title,caption) {
        dispatch({type:'edited', payload:{id:id,title:title,caption:caption}})
    }
    function handelAdd() {
        dispatch({type:'added', payload: {newTitle: DataInfo}})
        SetDataInfo('')
    }
    useEffect(()=>{
        dispatch({type:'getStorage'})
    },[])

    // Display Info
    const [DataInfo, SetDataInfo] = useState('')
    const [displayTodosType, setDisplayTodosType] = useState('All')

    function changeDisplayType(e) {
        setDisplayTodosType(e.target.value)
    }
    const CompletedTodos = useMemo(()=>{
        return Todos.filter((t)=>{
            return t.isCompleted
        })
    },[Todos])
    const notCompletedTodos = useMemo(()=>{
        return Todos.filter((t)=>{
            return !t.isCompleted
        })
    },[Todos])

    let TodosToBeRenderd = Todos
    function TodosRender() {
        if (displayTodosType === 'Completed') {
            TodosToBeRenderd = CompletedTodos
        }else if (displayTodosType === 'notCompleted'){
            TodosToBeRenderd = notCompletedTodos
        }
    }TodosRender()

    let JsxTodo = TodosToBeRenderd.map((t)=>{
        return <CardMession key={t.id} Todo={t} handelCheck={handelCheck} handelEdit={handelEdit} handelDelete={handelDelete} />;
    })


    return (
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275, maxHeight: '80vh', overflow: 'scroll' }}>

                <CardContent>

                    <Typography variant='h2'>
                        مهامي
                    </Typography>

                    <Divider />
                    {/*Buttons */}
                    <ToggleButtonGroup color={'buttons'} style={{marginTop: '20px'}} onChange={changeDisplayType} value={displayTodosType}>
                        <ToggleButton value={'notCompleted'}>غير منجز</ToggleButton>
                        <ToggleButton value={'Completed'}>منجز</ToggleButton>
                        <ToggleButton value={'All'}>الكل</ToggleButton>
                    </ToggleButtonGroup>
                    {/* Card Mession */}
                    {JsxTodo}
                    {/*=== Card Mession ===*/}
                    <Container maxWidth="sm" sx={{marginTop: '20px'}}>
                            <Grid container spacing={2}>

                                {/* Icons */} 
                                <Grid xs={5}>
                                    <Typography variant='h7'>
                                        <Button sx={{height:'100%', width: '100%'}} disabled={DataInfo.length <1} onClick={handelAdd} color='secondary' variant="contained">إِضافه</Button>
                                    </Typography>
                                </Grid>

                                {/* Todo List */}
                                <Grid xs={7}>
                                    <Typography variant='h5'>
                                        <TextField sx={{width: '100%'}} onChange={(event)=>{SetDataInfo(event.target.value)}} value={DataInfo} id="filled-basic" label="وصف المهمه" variant="filled" />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                </CardContent>

            </Card>

        </Container>
    );
}