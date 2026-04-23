import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import API from "@/utils/api";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  dueDate?: string;
}

type State = {
  tasks: Task[];
};

type Action =
 | { type: "INIT"; tasks: Task[] }
 | { type: "ADD"; task: Task }
 | { type: "UPDATE"; task: Task }
 | { type: "DELETE"; id: string }
 | { type: "TOGGLE"; id: string };

const mapTask = (t:any):Task => ({
 id: t._id || t.id,
 title: t.title,
 description: t.description || "",
 priority: t.priority || "medium",
 completed: t.completed ?? false,
 createdAt: new Date(t.createdAt || Date.now()).getTime(),
 dueDate: t.dueDate || undefined
});

const reducer = (state:State,action:Action):State=>{
switch(action.type){

case "INIT":
return {tasks:action.tasks};

case "ADD":
return {
tasks:[action.task,...state.tasks]
};

case "UPDATE":
return {
tasks:state.tasks.map(
t=>t.id===action.task.id ? action.task : t
)
};

case "DELETE":
return {
tasks:state.tasks.filter(
t=>t.id!==action.id
)
};

case "TOGGLE":
return{
tasks:state.tasks.map(
t=>t.id===action.id
? {...t,completed:!t.completed}
: t
)
};

default:
return state;
}
};

interface TaskContextValue{
tasks:Task[];
addTask:(data:Omit<Task,"id"|"createdAt"|"completed">)=>void;
updateTask:(task:Task)=>void;
deleteTask:(id:string)=>void;
toggleTask:(id:string)=>void;
}

const TaskContext=createContext<TaskContextValue | null>(null);

export function TaskProvider({
children
}:{children:ReactNode}){

const [state,dispatch]=useReducer(
reducer,
{tasks:[]}
);

const fetchTasks=async()=>{
try{
const res=await API.get("/tasks");
dispatch({
type:"INIT",
tasks:res.data.map(mapTask)
});
}
catch(err){
console.error("Fetch failed",err);
dispatch({
type:"INIT",
tasks:[]
});
}
};


useEffect(()=>{
fetchTasks();
},[]);


const value:TaskContextValue={

tasks:state.tasks,

addTask:async(data)=>{
try{
const res=await API.post(
"/tasks",
data
);

dispatch({
type:"ADD",
task:mapTask(res.data)
});

}
catch(err){
console.error("Add failed",err);
}
},

updateTask:async(task)=>{
try{
const res=await API.put(
`/tasks/${task.id}`,
task
);

dispatch({
type:"UPDATE",
task:mapTask(res.data)
});

}
catch(err){
console.error("Update failed",err);
}
},

deleteTask:async(id)=>{
try{
await API.delete(`/tasks/${id}`);

dispatch({
type:"DELETE",
id
});

}
catch(err){
console.error("Delete failed",err);
}
},

toggleTask:async(id)=>{

dispatch({
type:"TOGGLE",
id
});

try{
await API.patch(
`/tasks/${id}/toggle`
);
}
catch(err){

dispatch({
type:"TOGGLE",
id
});

console.error(
"Toggle failed",
err
);

}
}

};

return(
<TaskContext.Provider value={value}>
{children}
</TaskContext.Provider>
);

}

export function useTasks(){

const ctx=useContext(TaskContext);

if(!ctx){
throw new Error(
"useTasks must be used within TaskProvider"
);
}

return ctx;

}