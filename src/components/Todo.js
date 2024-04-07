import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function CardMession({handelCheck , handelDelete, handelEdit, Todo}) {

    function handelChechClick() {
      handelCheck(Todo.id)
      setMessageValue('تم التعديل بنجاح')
      setShowAlert('block')
      setTimeout(() => {
        setShowAlert('none')
      }, 2000);
    }
    function handelDeleteClick() {
      handelDelete(Todo.id)
    }
    function handelEditClick() {
      handelEdit(Todo.id,editMission.title,editMission.caption)
      if (editMission.title.length > 0) {
        SetopenEM(false)
      }
      setMessageValue('تم التعديل بنجاح')
      setShowAlert('block')
      setTimeout(() => {
        setShowAlert('none')
      }, 2000);
    }
    let [MessageValue, setMessageValue] = useState('')
    let [showAlert, setShowAlert] = useState('none')
    let [openDM,SetopenDM] = useState(false);
    let [openEM,SetopenEM] = useState(false);
    let [editMission,setMission] = useState({title: Todo.title, caption: Todo.caption})
    return (
      <Container maxWidth="sm">

        {/* Card Mession */}
            <Card
            sx={{ color: 'white', background:'#262F89', marginTop: '20px'}} className='TodoCard'>
              <CardContent>

                    <Grid container display={'flex'} alignItems={'center'} spacing={2}>

                        {/* Icons */} 
                        <Grid xs={5} display={'flex'} justifyContent={'space-around'}>
                            <IconButton onClick={()=>{SetopenDM(true)}} className='TodoList' style={{color: 'red',background: 'white',border: 'solid 2px red'}}>
                                <DeleteIcon/>
                            </IconButton>

                            <IconButton onClick={()=>{SetopenEM(true)}} className='TodoList' style={{color: '#1769aa',background: 'white',border: 'solid 3px #1769aa'}}>
                                <EditIcon/>
                            </IconButton>

                            <IconButton onClick={handelChechClick} className='TodoList' 
                                style={{color: Todo.isCompleted ? 'white' : 'green',
                                background: Todo.isCompleted ? 'green' : 'white',
                                border: 'solid 3px green' }}>
                                <CheckIcon/>
                            </IconButton>
                        </Grid>

                        {/* Todo List */}
                        <Grid xs={7}>
                            <Typography variant='h5' sx={{textAlign: 'right',paddingBottom: '10px', textDecoration: Todo.isCompleted ? 'line-through' : 'none' }}>{Todo.title}</Typography>
                            <Typography variant='h7'>{Todo.caption}</Typography>
                            </Grid>
                    </Grid>

              </CardContent>
            </Card>
        {/*=== Card Mession===*/}
        {/* Dialog */}

        {/*Delete Mission*/}
        <Dialog
        open={openDM}
        onClose={()=>{ SetopenDM(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction: 'rtl'}}
      >
        <DialogTitle id="alert-dialog-title">
          {"حذف المهمة"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد من حذف المهمة ؟
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{ SetopenDM(false) }}>الغاء</Button>
          <Button onClick={handelDeleteClick}>موافق</Button>
        </DialogActions>
        </Dialog>

        {/* Edit Mission*/}
        <Dialog
        open={openEM}
        onClose={()=>{SetopenEM(false)}}
        style={{direction: 'rtl'}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
          },
        }}
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
        <DialogContent>
          <DialogContentText>
            من فضلك قم بتعديل المهمه والضغط علي تعديل
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="mission name"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={editMission.title}
            onChange={(event)=>{setMission({...editMission, title: event.target.value})}}
          />
            <TextField
            margin="dense"
            name="mission caption"
            label="وصف المهمه"
            fullWidth
            variant="standard"
            value={editMission.caption}
            onChange={(event)=>{setMission({...editMission, caption: event.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{SetopenEM(false)}}>الغاء</Button>
          <Button onClick={handelEditClick} type="submit">تعديل</Button>
        </DialogActions>
        </Dialog>

        {/*=== Dialog ===*/}

        {/* Alert Message */}
          <Stack display={showAlert} sx={{ width: 'fit-content' , color: 'red', position:'fixed', left: 4, bottom:10 }} spacing={2}>
            <Alert  variant="filled" severity="success">
            {MessageValue}
            </Alert>
          </Stack>
        {/*=== Alert Message ===*/}
    </Container>
    );
  }