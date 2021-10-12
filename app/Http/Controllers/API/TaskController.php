<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }
    public function index(){
       $task = $this->taskRepository->getAll();
       return response()->json([
           'success' => 'true',
           'message' => 'Task list',
           'data' =>  $task
       ]);
    }
    public function store(Request $request){
        $formData = $request->all();
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => 'false',
                'message' => $validator->getMessageBag()->first(),
                'data' => null
            ]); 
        }

        $task = $this->taskRepository->create($request);
        return response()->json([
            'success' => 'true',
            'message' => 'Success',
            'data' =>  $task
        ]);
    }

    public function show($id){
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => 'false',
                'message' => 'task list',
                'data' => null
            ]); 
        }

        return response()->json([
            'success' => 'true',
            'message' => 'task list',
            'data' =>  $task
        ]);
    }
    public function update($id,Request $request){
        $task = $this->taskRepository->findById($id);
        if(is_null(($task))){
            return response()->json([
                'success' => 'false',
                'message' => "task not found",
                'data' => null
            ]);   
        }
        $formData = $request->all();
        //return response()->json($request->all());
        $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => 'false',
                'message' => $validator->getMessageBag()->first(),
                'data' => null
            ]); 
        }

        $task = $this->taskRepository->edit($id,$request);
        return response()->json([
            'success' => 'true',
            'message' => 'Success',
            'data' =>  $task
        ]);
    }

    public function destroy($id){
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => 'false',
                'message' => 'task list',
                'data' => null
            ]); 
        }
        $taskDelete =  $this->taskRepository->delete($id);
        return response()->json([
            'success' => 'true',
            'message' => 'Task Deleted Successfully!',
            'data' =>  $taskDelete
        ]);
    }
}
