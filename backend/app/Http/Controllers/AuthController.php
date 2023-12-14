<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AuthController extends Controller
{
    public function user(){
        return Auth::user();
    }

    public function register(Request $request){
        return User::create([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')) 
        ]);
    }

    public function login(Request $request){
        if (!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'Invalid Credentials!'
            ],Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();
        $token = $user->createToken('secrettoken')->plainTextToken;
        $cookie = cookie('jwt', $token,60 * 24); //1day

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }

    public function logout(){
       $cookie = Cookie::forget('jwt');
       return response([
        'message' => 'Success'
       ])->withCookie($cookie);
    }
}
