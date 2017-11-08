<?php namespace Fencus\GoogleMapsWidgets\FormWidgets;

use Backend\Classes\FormWidgetBase;
use Fencus\GoogleMapsWidgets\Models\Settings as MapsSettings;
use Lang;

class MapOptions extends FormWidgetBase
{

	public $width = "100%";
	public $height = "300px";
	public $markers;
	public $function;
	
	public function widgetDetails()
    {
        return [
            'name'        => 'Map Configurator',
            'description' => ''
        ];
    }
    
    public function init()
    {
    	$this->fillFromConfig([
    			'width',
    			'height',
    			'markers',
    			'function',
    	]);
    }

    public function render()
    {
    	$this->vars['api_key'] = MapsSettings::get('api_key');
    	$this->vars['locationDefault'] = MapsSettings::get('location');
    	$this->vars['name'] = $this->formField->getName();
    	$this->vars['value'] = $this->getLoadValue();
    	$this->vars['width'] = $this->width;
    	$this->vars['height'] = $this->height;
    	$this->vars['markers'] = $this->markers;
    	if($this->function && $this->function == 'true')
    		$this->vars['function'] = 'true';
    	else
    		$this->vars['function'] = '';
			
		if($this->previewMode)
		{
			$this->addJs('js/mapoptions_preview.js');
		}
		else
		{
			$this->addJs('js/mapoptions.js');
		}
    	return $this->makePartial('mapoptions');
    }

    protected function loadAssets()
    {
				
    }
    
    public function onGetMarkers()
    {
    	$markers = post('markers');
    	$sessionKey = post('sessionKey');
    	$function = post('isFunction');
    	if($sessionKey && !$function)
    	{
    		$json = json_encode($this->model->$markers()->withDeferred($sessionKey)->get());
    	}
    	else if ($function)
    	{
    		$json = json_encode($this->model->$markers());
    	}
    	else
    	{
    		$json = json_encode($this->model->$markers);
    	}
    	return $json;
    }

}
