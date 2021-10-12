import Axios from 'axios';
import React, { Component } from 'react'
import {Card ,Button,Badge,Spinner } from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { publicUrl } from '../../../Constant';

export default class ViewProject extends Component {
   
    state = {
        ProjectList : [],
        isLoading :false,
    }
    componentDidMount() {
        this.getprojectLists();
    };
   
    getprojectLists = () => {
        
        this.setState({ isLoading :true});
        
        Axios.get('http://127.0.0.1:8000/api/projects/').then((response) => {
           const ProjectList = response.data.data;
           this.setState({
              ProjectList,
              isLoading :false,
           });
        }); 
    }
   
    render() {
        
        return (
            
            <>
                <div className="mt-4 header-part">
                    <div className="float-left">
                        <h2 >Project List<Badge bg="primary" className="mr-5">{this.state.ProjectList.length}</Badge></h2>
                    </div>
                   
                    <div className="float-right">
                        
                    <Link to={`${publicUrl}create/project`} className="btn btn-success" >
                        Create Project
                    </Link>
                        
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="text-center">
                {
                  this.state.isLoading && 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                </div>
               {
                   this.state.ProjectList.map((project,index) => (
                    <Card className="mt-3" key={index}>
                        <Card.Body>
                        <Card.Header as="h5">{project.name}</Card.Header>
                            <Card.Text>{project.description}</Card.Text>
                            <Button variant="primary">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={`${publicUrl}view/project/${project.id}`}>
                                View
                                </Link>{' '}
                            </Button>{' '}
                            <Button variant="secondary">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={`${publicUrl}edit/project/${project.id}`}>
                                Edit
                                </Link>{' '}
                            </Button>{' '}
                            <Button variant="danger">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={`${publicUrl}delete/project/${project.id}`}>
                                Delete
                                </Link>{' '}
                            </Button>{' '}
                        </Card.Body>
                    </Card>
                   ))
               }
            </>
        )
    }
}
