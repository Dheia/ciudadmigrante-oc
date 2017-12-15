<?php namespace CiudadMigrante\CiudadMigrante\Api;

use Illuminate\Routing\Controller;
use Input;
use CiudadMigrante\CiudadMigrante\Models\Relato;
use RainLab\Translate\Classes\Translator;

class Relatos extends Controller
{

    public function index()
    {
        Translator::instance()->setLocale(Input::get('lang'));

        $categories = [];
        if (Input::get('categories')) {
            $categories = explode(',', Input::get('categories'));
        }

        $query = Relato::where('publicado', '1')
                        ->with('image')
                        ->with('image_map')
                        ->with('puntos_de_acogida')
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
                $item->image_url = $item->image->getThumb(null,360);
            }         
            if ($item->image_map) {
                $item->image_map_url = $item->image_map->getThumb(540,null);
            }

            // find youtube id
            if ($item->video_url) {
                preg_match("#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+(?=\?)|(?<=v=)[^&\n]+|(?<=youtu.be/)[^&\n]+#", $item->video_url, $matches);
                if ($matches) {
                    $item->youtube_id = $matches[0];
                }
            }
            
            $return[$item->id] = $item;
        }

        return response()->json($return, 200, array(), JSON_PRETTY_PRINT);
    }



    public function metadata($id)
    {
        $query = Relato::where('id', $id)
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
    <meta property="og:url"           content="relato/<?=$id?>">
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