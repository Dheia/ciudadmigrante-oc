<?php namespace KubaMarkiewicz\Translations\Api;

use Illuminate\Routing\Controller;
use KubaMarkiewicz\Translations\Models\Translation;
use RainLab\Translate\Classes\Translator;
use DB;
use Input;

class Translations extends Controller
{

    public function index()
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $query = Translation::orderBy('code', 'asc');

        $result = $query->get(); 

        $return = [];

        foreach ($result as $item) {
            $path = explode('.', $item->code);
            $parent = &$return;
            foreach ($path as $slug) {
                $parent = (array) $parent;
                $parent = &$parent[$slug];
            }
            $parent = $item->translation;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }



    public function add()
    {
        // dump(post());
        // exit;

        if (!$code = post('code')) {
            return 'code missing';
        }


        $row = Translation::where('code', $code)->first();
        if ($row) {
            return 'code exists';
        }

        $translation = new Translation();
        $translation->code = $code;
        $translation->sort_order = 9999;
        $translation->type = post('type');
        $translation->translation = post('translation');
        $translation->save();

        // sort_order
        $section = substr($code, 0, strrpos($code, '.'));
        $this->fixSortOrder($section);

        return 'added';
    }


    public function fixSortOrder($section)
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

}