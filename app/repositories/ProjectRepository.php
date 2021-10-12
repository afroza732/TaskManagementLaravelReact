<?php
namespace App\repositories;

use App\interfaces\CrudInterface;
use App\Models\Project;
use Illuminate\Http\Request;
class ProjectRepository implements CrudInterface{
    public function getAll()
    {
        $projects = Project::orderBy('id','desc')->get();
        return $projects;
    }

    public function findById($id)
    {
        $project = Project::find($id);
        return $project; 
    }
    public function create(Request $request)
    {
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id =  $request->user_id;
        $project->save();
        return $project;
    }
    public function edit($id,Request $request)
    {
        $project = $this->findById($id);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();
        return $project; 
    }
    public function delete($id)
    {
        $project = $this->findById($id);
        $project->delete();
        return $project;  
    }
}