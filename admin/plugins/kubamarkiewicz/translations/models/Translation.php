<?php namespace KubaMarkiewicz\Translations\Models;

use Model;

/**
 * Model
 */
class Translation extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;

    /*
     * Validation
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'kubamarkiewicz_translations_translations';

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel']; 

    public $translatable = ['translation'];

    const TYPE_RICHEDITOR = 'richeditor';




    public static function fixSortOrder($section)
    {
        $query = Translation::where('code', 'LIKE', $section.".%")
                        ->where('code', 'NOT LIKE', $section.".%.%")
                        ->orderBy('sort_order', 'asc');
        $result = $query->get();
        $i = 1;
        if ($result) foreach ($result as $item) {
            $item->sort_order = $i;
            $item->save();
            $i++;
        }
    }



    public static function translate($code, $translation = '', $type = '')
    {
        $row = Translation::where('code', $code)->first();

        if (!$row) {
            $row = new Translation();
            $row->code = $code;
            $row->sort_order = 9999;
            $row->type = $type;
            $row->translation = $translation;
            $row->save();

            // sort_order
            $section = substr($code, 0, strrpos($code, '.'));
            self::fixSortOrder($section);
        }

        return $row->translation;
    }

}