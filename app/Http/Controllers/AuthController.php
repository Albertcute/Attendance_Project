<?php

namespace App\Http\Controllers;

use App\Models\Register;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->validate([
            'user_name'=>'required|string|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|string',
        ]);

        $user = User::create([
            'user_name'=> $data['user_name'],
            'email'=> $data['email'],
            'password'=> Hash::make($data['password']),
        ]);



        $responce = [
            'user'=>$user,
        ];

        return response($responce, 201);
    }

    public function logout(Request $request) {

        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }
        return [
            'message' => 'Logged out'
        ];
    }


    public function login(Request $request){

        $fields = $request->validate([
            'email'=>'required|email|max:191',
            'password'=>'required|string',
        ]);



        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'],$user->password)){

            return response(['message'=>'Invalid Credentials'], 401);
        }
        else {

            $token = $user->createToken('API')->plainTextToken;

            $response = [
                'user' => $user,
                'token' =>$token,
            ];

            return response($response, 200);
        }






    }


}
