<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;



class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function authenticated(Request $request)
    {   
            // dd($request);

            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
        
            $user = User::where('email', $request->email)->first();
           
        
            if (! $user || ! Hash::check($request->password, $user->password)) {

                return response()->json([
                    'status_code' => 422  ,
                    'message' => 'The provided credentials are incorrect.',
                ]);
            }else {
                $firstname = $user->firstname;
            }
        
            $tokenResult = $user->createToken('authToken')->plainTextToken;
    
             return response()->json([
                 'status_code' => 200,
                 'access_token' => $tokenResult,
                 'token_type' => 'Bearer',
                 'fname' => $firstname,
             ], 200);


    }

}
