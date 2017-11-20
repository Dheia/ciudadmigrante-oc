<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigranteEspacios extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacios', function($table)
        {
            $table->string('button_url', 255);
            $table->string('button_title', 255);
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacios', function($table)
        {
            $table->dropColumn('button_url');
            $table->dropColumn('button_title');
        });
    }
}
