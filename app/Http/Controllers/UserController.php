<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\User as UserResource;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'firstname' =>  'required',
            'lastname'  =>  'required',
            'username'  =>  'required|unique:users',
            'email'     =>  'required|email|unique:users',
            'password'  =>  'required|alpha_num',
        ]);

        if($validator->fails()) {
            return response()->json([
                "status" => 402, 
                "message" => "validation_error", 
                "errors" => $validator->errors()
            ]);
        }

        $user_data = [
            'prefixname' => $req->prefix,
            'firstname' => $req->firstname,
            'middlename' => $req->middlename,
            'lastname'  => $req->lastname,
            'suffixname'  => $req->suffix,
            'username'  => $req->username,
            'email'     => $req->email,
            'password'  => Hash::make($req->password),
            'type'      => $req->utype,
        ];

        $user = User::create($user_data);

        if(!is_null($user)) {

            return response()->json([
                "status" => 200, 
                "success" => true, 
                "message" => "Registration completed", 
                "data" => $user
            ], 200);

        } else {
            return response()->json([
                "status" => $this->server_error, 
                "success" => false, 
                "message" => "failed to register"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {    
        return new UserResource(User::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'firstname' =>  'required',
            'lastname'  =>  'required',
            'username'  =>  'required|unique:users',
            'email'     =>  'required|email|unique:users',
        ]);

        if($validator->fails()) {
            return response()->json([
                "status" => 402, 
                "message" => "validation_error", 
                "errors" => $validator->errors()
            ]);
        }

        $user_data = [
            'prefixname' => $req->prefix,
            'firstname' => $req->firstname,
            'middlename' => $req->middlename,
            'lastname'  => $req->lastname,
            'suffixname'  => $req->suffix,
            'username'  => $req->username,
            'email'     => $req->email,
            'type'      => $req->type,
        ];

        $user = DB::table('users')->where('id',$id)->update($user_data);


        if(!is_null($user)) {

            return response()->json([
                "status" => 200, 
                "success" => true, 
                "message" => "Data updated successfully!", 
                "data" => $user
            ], 200);

        } else {
            return response()->json([
                "status" => 500, 
                "success" => false, 
                "message" => "Something went wrong"
            ], 500);
        }
    }

    public function destroy($user)
    {
        User::where('id', $user)->delete(); 

        return response()->json([
            "message" => "Data deleted successfully!", 
        ], 200);

    }

    public function trashed(){

        return User::onlyTrashed()->get();

    }

    public function restore($user){

        User::where('id', $user)->restore();

        $getName = User::find($user);

        return response()->json([
            "message" => "Successfully restored user {$getName->firstname}", 
        ], 200);

    }
    
    public function force_delete($user){

        User::where('id', $user)->forceDelete();

        return response()->json([
            "message" => "User data deleted permanently ", 
        ], 200);

    }


}
