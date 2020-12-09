<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Employee extends JsonResource
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
            'firstname' => $this->firstname,
            'lastname'  => $this->lastname,
            'age'       => $this->age,
            'birth_date'    => $this->birth_date,
            'email'     => $this->email,
            'password'  => $this->password,
            'date_created'  => $this->date_created,
            'job_title'     => $this->job_title,
            'access_level_id'   => $this->access_level_id,
            'date_modified'    => $this->date_modified,
        ];
    }
}
