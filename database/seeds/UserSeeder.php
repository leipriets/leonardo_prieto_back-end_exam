<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'prefixname' =>  'Mr',
            'firstname' =>  'leonardo',
            'middlename'  =>  'tanala',
            'lastname'  =>  'prieto',
            'username'  =>  'leo',
            'email'       =>  'leo@mail.com',
            'password' => Hash::make('prieto'),
            'type' => 'admin',
        ]);
    }
}
