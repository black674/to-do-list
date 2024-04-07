import { v4 as uuidv4 } from 'uuid';


export default function Reducer(currentTodos,action) {
    switch (action.type) {
        case 'checked':{
            let handelCheck = currentTodos.map((t)=>{
                if (t.id === action.payload.id) {
                    let updateIsCompleted = {
                        ...t, isCompleted: !t.isCompleted
                    }
                    return updateIsCompleted
                }
                return t
            })
            localStorage.setItem('Todos',JSON.stringify(handelCheck))
            return handelCheck
        }
        case 'added':{
            if (action.payload.newTitle.length >= 1){
                const UpdatedTodos = [...currentTodos, {
                    id: uuidv4(),
                    title: action.payload.newTitle,
                    caption: '',
                    isCompleted: false
                }]
                localStorage.setItem('Todos',JSON.stringify(UpdatedTodos))
                return UpdatedTodos
            }
        break;
        }
        case 'deleted':{
            let missionDelete = currentTodos.filter((t)=>{
                if (t.id === action.payload.id) {
                    return t.id !== action.payload.id
                }
                return t
            })
            localStorage.setItem('Todos',JSON.stringify(missionDelete))
            return missionDelete
        }
        case 'edited':{
            let missionEdit = currentTodos.map((t)=>{
                if (action.payload.title.length > 0) {
                    if (t.id === action.payload.id) {
                        return({...t ,title : action.payload.title, caption: action.payload.caption})
                    }
                }
                return t
            })
            localStorage.setItem('Todos',JSON.stringify(missionEdit))
            return missionEdit
        }
        case 'getStorage':{
            const getStorage = JSON.parse(localStorage.getItem('Todos')) ?? []
            return getStorage
        }
        default:{
            throw Error('Unkown Error ' + action.type)
        }
    }
}