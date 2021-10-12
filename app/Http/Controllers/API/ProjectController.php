<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\repositories\ProjectRepository;
use Illuminate\Http\Request;


class ProjectController extends Controller
{
    public $projectRepository;


    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }
    public function index(){
       $projects = $this->projectRepository->getAll();
       return response()->json([
           'success' => 'true',
           'message' => 'Project list',
           'data' =>  $projects
       ]);
    }
    public function store(Request $request){
        
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ]);
        
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->getMessageBag(),
            ]); 
        }
       // dd($validator->fails());
        $project = $this->projectRepository->create($request);
        return response()->json([
            'success' => 'true',
            'message' => 'Success',
            'data' =>  $project
        ]);
    }

    public function show($id){
        $data['project'] = $this->projectRepository->findById($id);
        $data['tasks'] = $this->projectRepository->getTaskByProjectId($id);
    
        if(is_null($data['project'])){
            return response()->json([
                'success' => 'false',
                'message' => 'Project list',
                'data' => null
            ]); 
        }

        return response()->json([
            'success' => 'true',
            'message' => 'Project list',
            'data' =>  $data
        ]);
    }
    public function update($id,Request $request){
        $project = $this->projectRepository->findById($id);
        if(is_null(($project))){
            return response()->json([
                'success' => 'false',
                'message' => "Project not found",
                'data' => null
            ]);   
        }
        $formData = $request->all();
        //return response()->json($request->all());
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => 'false',
                'message' => $validator->getMessageBag()->first(),
                'data' => null
            ]); 
        }

        $project = $this->projectRepository->edit($id,$request);
        return response()->json([
            'success' => 'true',
            'message' => 'Success',
            'data' =>  $project
        ]);
    }

    public function destroy($id){
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => 'false',
                'message' => 'Project list',
                'data' => null
            ]); 
        }
        $projectDelete =  $this->projectRepository->delete($id);
        return response()->json([
            'success' => 'true',
            'message' => 'Project Deleted Successfully!',
            'data' =>  $projectDelete
        ]);
    }
}
