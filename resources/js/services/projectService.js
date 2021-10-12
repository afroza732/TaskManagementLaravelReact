import Axios from 'axios';
export const getprojectLists = async () =>{
    return await Axios.get('http://127.0.0.1:8000/api/projects/').then((response) => {
           const ProjectList = response.data.data;
        //    console.log(ProjectList);
           //return ProjectList;
           
        }); 
}
/**
 * store new project
 * 
 * @param {object} data
 */
export const storeNewProject = async (data) => {
    data.user_id = 1;
    return await Axios.post('http://127.0.0.1:8000/api/projects/',data).then((response) => {
        return response.data;   
    }); 
}