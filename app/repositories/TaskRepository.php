<?php
namespace App\repositories;

use App\interfaces\CrudInterface;
use App\Models\Task;
use Illuminate\Http\Request;
class TaskRepository implements CrudInterface{
    public function getAll()
    {
        $tasks = Task::orderBy('id','desc')->get();
        return $tasks;
    }

    public function findById($id)
    {
        $task = Task::find($id);
        return $task; 
    }
    public function create(Request $request)
    {
        $task = new Task();
        $task->name = $request->name;
        $task->description = $request->description;
        $task->project_id =  $request->project_id;
        $task->save();
        return $task;
    }
    public function edit($id,Request $request)
    {
        $task = $this->findById($id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->save();
        return $task; 
    }
    public function delete($id)
    {
        $task = $this->findById($id);
        $task->delete();
        return $task;  
    }
}