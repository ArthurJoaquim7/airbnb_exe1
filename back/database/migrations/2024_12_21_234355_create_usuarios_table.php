<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
    * @return void
     */
    // public function up()
    // {
    //     Schema::create('users', function (Blueprint $table) {
    //         $table->id();
    //         $table->string('username');
    //         $table->string('password');
    //         $table->unsignedBigInteger('role_id');
    //         $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
    //         $table->timestamps();
    //     });
    // }
    

    /**
     * Reverse the migrations.
     *
    * @return void
     */
    // public function down()
    // {
    //     Schema::dropIfExists('usuarios');
    // }
}
