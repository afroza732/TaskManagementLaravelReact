import Axios from 'axios';
export const getTaskLists = async () =>{
    return await Axios.get('http://127.0.0.1:8000/api/tasks/').then((response) => {
           const TaskList = response.data.data;
        //    console.log(ProjectList);
           //return ProjectList;
           
        }); 
}
/**
 * store new project
 * 
 * @param {object} data
 */
export const storeNewTask = async (data) => {
    data.project_id = parseInt(data.project_id);
    return await Axios.post('http://127.0.0.1:8000/api/tasks/',data).then((response) => {
        return response.data;   
    }); 
}