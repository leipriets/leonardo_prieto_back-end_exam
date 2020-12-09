<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'prefix' => $this->prefix,
            'firstname' => $this->firstname,
            'middlename' => $this->middlename,
            'lastname' => $this->lastname,
            'suffixname' => $this->suffixname,
            'username' => $this->username,  
            'email' => $this->email,
            'full_name' => $this->full_name,
            'type' => $this->type,
            'photo' => $this->photo

        ];
    }
}
