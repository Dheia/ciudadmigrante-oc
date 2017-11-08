<?php namespace Fencus\GoogleMapsWidgets\Behaviors;

/**
 * Map Model
 */
class Map extends \October\Rain\Extension\ExtensionBase
{
	
	/**
	 * @var Reference to the extended object.
	 */
	protected $parent;

    public function __construct($parent)
    {
        $this->parent = $parent;
    }

	public function getHtmlMap($alias, $markers = [])
	{
		if(!$alias)
		{
			throw new ApplicationException(Lang::get('fencus.googlemapswidgets::lang.maps.no_alias'));
		}
		$alias =  str_replace(' ', '_',$alias);
		$template = file_get_contents('plugins/fencus/googlemapswidgets/assets/template/template.htm');
		$search=[
				'::alias',
				'::options',
				'::jsonLocations',
				'::width',
				'::height',
		];
		$replace=[
				$alias,
				$this->parent->options,
				json_encode($markers),
				$this->parent->width,
				$this->parent->height,
		];
		$html = str_replace($search, $replace, $template);
		return $html;
	}

}