<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use Input;
use CiudadMigrante\CiudadMigrante\Models\Espacio;
use RainLab\Translate\Classes\Translator;

class Espacios extends Controller
{

    public function index()
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $categories = [];
        if (Input::get('categories')) {
            $categories = explode(',', Input::get('categories'));
        }

        $query = Espacio::where('publicado', '1')
                        ->with('image')
                        ->with('image_map')
                        ->with('images.image')
                        ->orderBy('sort_order', 'asc');

        if ($categories) {
            $query->whereHas('categories', function($query) use ($categories) {
                $query->whereIn('id', $categories);
            });
        }
                        

        $result = $query->get(); 

        $return = [];

        if ($result) foreach ($result as $item) {           
            if ($item->image) {
                $item->image_url = $item->image->getThumb(null,null);
            }              
            if ($item->image_map) {
                $item->image_map_url = $item->image_map->getThumb(540,null);
            }
            
            $return[] = $item;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }


    public function find($id)
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $query = Espacio::where('id', $id)
                        ->with('images.image');

        $item = $query->first();   

        // find youtube id
        if ($item->button_url) {
            preg_match("#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+(?=\?)|(?<=v=)[^&\n]+|(?<=youtu.be/)[^&\n]+#", $item->button_url, $matches);
            if ($matches) {
                $item->youtube_id = $matches[0];
            }
        }

        return response()->json($item, 200, array(), JSON_PRETTY_PRINT);
    }



    public function metadata($id)
    {
        $query = Espacio::where('id', $id)
                        ->with('image');
        $item = $query->first(); 

        // dump($item);

        if ($item) : 
          
?>
<!doctype html>
<html>
<head>
    <title>Ciudad Migrante - <?=$item->name?></title>
    <meta name="description" content="<?=strip_tags($item->descripcion)?>">
    <!-- You can use open graph tags to customize link previews.
    Learn more: https://developers.facebook.com/docs/sharing/webmasters -->
    <meta property="og:url"           content="espacio/<?=$id?>">
    <meta property="og:type"          content="website">
    <meta property="og:title"         content="Ciudad Migrante - <?=$item->name?>">
    <meta property="og:description"   content="<?=strip_tags($item->descripcion)?>">
    <meta property="og:image"         content="<?=$item->image->getThumb(null,null)?>">
    <!-- <meta property="fb:app_id"        content=""> -->
</head>
<body></body>
</html>
        <?php endif;
    }

}