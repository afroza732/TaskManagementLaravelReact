import Axios from 'axios';
import React, { Component } from 'react'
import {Card ,Button,Badge,Spinner } from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,params} from "react-router-dom";
import { publicUrl } from '../../../Constant';
import CreateTask from '../tasks/CreateTask';

export default class ViewProject extends Component {
   
    state = {
        project : {},
        taskList : [],
        isLoading :false,
        addTaskToggle :false,
    }
    componentDidMount() {
        this.getProjectDetails();
    };
   
    getProjectDetails = () => {
        
        this.setState({ isLoading :true});
        const id = this.props.match.params.id;
        Axios.get(`http://127.0.0.1:8000/api/projects/${id}`).then((response) => {
           this.setState({
              project : response.data.data.project,
              taskList : response.data.data.tasks,
              isLoading :false,
           });
        }); 
    }
    addTaskToggle = () => {
        this.setState({
            'addTaskToggle' : !this.state.addTaskToggle,
        })
    }
    onCompleteTaskCreate = (task) => {
        this.addTaskToggle();
        let tasks = this.state.taskList;
        
        tasks.unshift(task);
       
        this.setState({
            taskList : tasks,
        })
    }
    render() {
        
        return (
            
            <>
                <div className="mt-2 header-part">
                    <div className="float-left">
                        <h2 >{this.state.project.name}<Badge bg="primary" className="mr-2">{this.state.taskList.length}</Badge></h2>
                    </div>
                    <div style={{ float: 'right'}}>
                        <Button className="btn btn-info" style={{marginRight:'3px'}}> Edit</Button>    
                        <Button className="btn btn-success mr-2" onClick={() => this.addTaskToggle()}>
                           {!this.state.addTaskToggle && <span>+New Task</span>} 
                           {this.state.addTaskToggle && <span>Cancel</span>} 
                        </Button>  
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="float-left">
                    <p>{this.state.project.description}</p>
                </div>
                {
                    this.state.addTaskToggle &&
                  <CreateTask project_id={this.props.match.params.id} onCompleteTaskCreate = {this.onCompleteTaskCreate}/>
                }
                <div className="text-center">
                {
                  this.state.isLoading && 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                </div>
               {
                   this.state.taskList.map((task,index) => (
                    <Card className="mt-3" key={index}>
                        <Card.Body>
                            <p>
                                {task.status == 1 && (
                                    <del>
                                        <strong>{task.name}</strong>{''}
                                        <Badge variant="primary">{task.tasks_count}</Badge>
                                    </del>
                                )}
                                {task.status == 0 && (
                                   <strong>{task.name}</strong>
                                   
                                )}
                            </p>
                            <Card.Text>{task.description}</Card.Text>
                            
                        </Card.Body>
                    </Card>
                   ))
               }
            </>
        )
    }
}