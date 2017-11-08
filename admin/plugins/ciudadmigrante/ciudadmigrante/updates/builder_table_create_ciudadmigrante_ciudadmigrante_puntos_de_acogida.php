<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateCiudadmigranteCiudadmigrantePuntosDeAcogida extends Migration
{
    public function up()
    {
        Schema::create('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 255);
            $table->string('telefono', 80);
            $table->string('email', 80);
            $table->string('direccion', 255);
            $table->string('codigo_postal', 20);
            $table->string('ciudad', 50);
            $table->string('web', 255);
            $table->boolean('enviado_por_web');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->boolean('publicado')->default(1);
            $table->string('enviado_por_nombre', 255);
            $table->string('enviado_por_email', 255);
            $table->string('latitude', 50);
            $table->string('longitude', 50);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ciudadmigrante_ciudadmigrante_puntos_de_acogida');
    }
}
