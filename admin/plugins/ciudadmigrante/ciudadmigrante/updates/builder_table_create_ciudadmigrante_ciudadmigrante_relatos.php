<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateCiudadmigranteCiudadmigranteRelatos extends Migration
{
    public function up()
    {
        Schema::create('ciudadmigrante_ciudadmigrante_relatos', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 255);
            $table->string('video_url', 255);
            $table->text('descripcion');
            $table->string('latlng', 255);
            $table->string('direccion', 255);
            $table->boolean('publicado');
            $table->integer('sort_order');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ciudadmigrante_ciudadmigrante_relatos');
    }
}
