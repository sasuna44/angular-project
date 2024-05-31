<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Models\User;

class AuthController extends Controller
{
    //
        /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $credentials = $request->only('email', 'password');
    
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        // Retrieve the authenticated user
        $user = auth()->user();
    
        // Additional data to be sent with the token
        $additionalData = [
            'id' => $user->id,
            'email' => $user->email,
            'role'=>$user->role,
            // Add more data as needed
        ];
    
        // Generate a token with additional data
        $tokenWithAdditionalData = JWTAuth::claims($additionalData)->attempt($credentials);
    
        return response()->json(['token' => $tokenWithAdditionalData,'user'=>$additionalData], 200);
    }

 /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'gender' => 'required|in:male,female', 
        ]);
    
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
    
        $imagePath = null;
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
        }
    
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)],
            ['image' => $imagePath]
        ));
    
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }
    

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }


    public function updateProfile(Request $request) {

        $validator = Validator::make($request->all(), [
            'username' => 'string|between:2,100',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gender' => 'in:male,female',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
    
        $user = auth()->user();
    
        if ($request->has('username')) {
            $user->username = $request->username;
        }
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
            // Update user's image path
            $user->image = $imagePath;
        }
    
    
        if ($request->has('gender')) {
            $user->gender = $request->gender;
        }
    
    
        $user->save();
    
        // Return a JSON response for successful profile update
        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
    
    
}
