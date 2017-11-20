<?php namespace KubaMarkiewicz\Translations\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateKubamarkiewiczTranslationsTranslations extends Migration
{
    public function up()
    {
        Schema::create('kubamarkiewicz_translations_translations', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('code', 255);
            $table->text('translation');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('kubamarkiewicz_translations_translations');
    }
}
