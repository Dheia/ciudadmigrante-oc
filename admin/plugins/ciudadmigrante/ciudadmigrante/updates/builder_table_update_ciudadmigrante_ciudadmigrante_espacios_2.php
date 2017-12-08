<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigranteEspacios2 extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacios', function($table)
        {
            $table->string('button_2_url', 255);
            $table->string('button_2_title', 255);
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacios', function($table)
        {
            $table->dropColumn('button_2_url');
            $table->dropColumn('button_2_title');
        });
    }
}
