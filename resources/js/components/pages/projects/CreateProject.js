import Axios from 'axios';
import React, { Component } from 'react'
import {Card ,Button,Badge,Spinner,Form } from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,withRouter} from "react-router-dom";
import { publicUrl } from '../../../Constant';
import { storeNewProject } from '../../../services/projectservice';

class CreateProject extends Component {
    
    state = {
        isLoading :false,
        name : "",
        description : "",
        errors : [],
    }
    componentDidMount() {};
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });
    }
    submitForm = async (e) => {
        const {history} = this.props;
        this.setState({isLoading : true});
        e.preventDefault();
       const postBody = {
           'name' : this.state.name,
           'description' : this.state.description,
       }
       const response =  await storeNewProject(postBody);
        if(response.success){
           this.setState({
            'name' : "",
            'description' : "",
            isLoading : false,
           });
           history.push(`${publicUrl}project`);
        }else{
            this.setState({
                'errors' : response.errors,
                isLoading : false,
            });
        }

    
    }
    render() {
        return (
            <>
                <div className="mt-4">
                <Link to={`${publicUrl}project`} className="btn btn-success">
                        Project List
                    </Link>
                </div>
                <Form onSubmit={this.submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name}  placeholder="Enter name" onChange={(e) => this.changeHandler(e)}/>
                        <span className="text-danger">{this.state.errors.name}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={this.state.description} onChange={(e) => this.changeHandler(e)}/>
                        <span className="text-danger">{this.state.errors.description}</span>
                    </Form.Group>
                   
                    <br />
                    {
                        this.state.isLoading && 
                        <Button variant="primary" type="submit" disabled>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Saving...</span>
                            </Spinner>
                        </Button>
                    }
                    {
                        !this.state.isLoading && 
                        <Button variant="primary" type="submit">Submit</Button>
                    }
                   
                </Form>
            </>
        )
    }
}

export default withRouter(CreateProject);
