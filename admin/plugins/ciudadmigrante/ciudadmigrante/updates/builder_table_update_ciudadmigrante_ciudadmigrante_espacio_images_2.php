<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigranteEspacioImages2 extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->text('marco_url')->nullable();
            $table->integer('marco_x1')->nullable()->change();
            $table->integer('marco_y1')->nullable()->change();
            $table->integer('marco_x2')->nullable()->change();
            $table->integer('marco_y2')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->dropColumn('marco_url');
            $table->integer('marco_x1')->nullable(false)->change();
            $table->integer('marco_y1')->nullable(false)->change();
            $table->integer('marco_x2')->nullable(false)->change();
            $table->integer('marco_y2')->nullable(false)->change();
        });
    }
}
