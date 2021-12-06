# MMM-GoogleMaps-Tracking


A module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) for tracking a geo-location with google maps and MagicMirror notifications.

![Alt text](/examples/screenshot.png "Example Screenshot of MMM-GoogleMaps-Tracking")

## Using the module

To use this module, clone this repo to your `MagicMirror/modules/` directory.

`git clone https://github.com/MartinGris/MMM-GoogleMaps-Tracking`

install dependencies:

`cd MMM-GoogleMaps-Tracking`

`npm install`

And add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [

        {
		   module: 'MMM-GoogleMaps-Tracking',
		   header: '<HEADER>',
		   position: 'bottom_left',
		   config: {
			   apikey: '<YOUR_KEY>',
			   lat: '<LATITUDE_CENTER>',
			   lon: '<LONGITUDE_CENTER>',
			   zoom: <ZOOM>,
			   mapType: '<MAP_TYPE>',
   			   marker:[
				{
					label: '<LABEL>',
					lat: '<LATITUDE>',
					lon: '<LONGITUDE>',
					icon: 'ICON_URL'
				},
			   ]
			   
		   }
		}

    ]
}
```

## Configuration options

| Option               | Description
|--------------------- |-----------
| `apikey`                | *Required* Google api key. See below for help. <br>**Type:** `string`
| `lat`  			   | *Optional* Latitude used for centering the map (remove option for center calculation by markers)  <br>**Type:** `string` 
| `lon`  			   | *Optional* Longitude used for centering the map (remove option for center calculation by markers)  <br>**Type:** `string`
| `zoom`  			   | *Optional* Zoomlevel. Check google docs for more infos. remove option for automated fit of bounds by markers. Usage is recommended if only one marker is set <br>**Type:** `int`
| `labelAnchorH`  		   | *Optional* Sets the horizontal offset of the anchor point of the label.<br>**Type:** `int`<br>**Default:** 0
| `labelAnchorV`  		   | *Optional* Sets the vertical offset of the anchor point of the label.<br>**Type:** `int`<br>**Default:** 0
| `offsetLat`                      | *Optional* Sets the latitude center offset on map updates (good if you have big labels).<br>**Type** `int`<br> **dafult** 0
| `offsetLon`                      | *Optional* Sets the longitude center offset on map updates (good if you have big labels).<br>**Type** `int`<br> **dafult** 0
| `mapType`  		   | *Optional* This overwrites the styles property which can be set in map-styles.js. Possbile values: hybrid, roadmap, satellite, terrain. Must be lower case. see [Google MapTypeId constants](https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeId)<br>**Type:** `string`
| `marker`  		   | *Required* List of markers defined by latitude and longitude. <br>**Type:** `string`
| `icon`  			   | *Optional* URL to custom icon  <br>**Type:** `string` <br>**Default:** google red spotlight icon
| `label`  			   | *Optional* To add a text label to the marker<br>**Type:** `string` <br>**Default:** none


## Google API Key

Obtain an api key at [Google Developer's page](https://developers.google.com/maps/documentation/javascript/).

## Notification
Use `UPDATE_POSITION` notification for setting or updating the markers. Pass latitude, longitude and optional icon url in a simple javascript object:
```js
	{
		lat: "<LATITUDE>",
		lon: "<LONGITUDE>"
		marker:[
			{        
				label: "<LABEL>",
				lat: "<LATITUDE>",
				lon: "<LONGITUDE>"
				icon: "ICON_URL"
			},
			{        
				label: "<LABEL>",
				lat: "<LATITUDE>",
				lon: "<LONGITUDE>"
				icon: "ICON_URL"
			},
			{        
				label: "<LABEL>",
				lat: "<LATITUDE>",
				lon: "<LONGITUDE>"
				icon: "ICON_URL"
			}
		]
}
```

The first lat & lon properties are optional. They are used for centering the map at this location. Forget about them when you want to set the center of the map in the middle of your markers.

You can use the [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) module and the rest api for remote access. For example this POST request will update the marker on the map: `http://magicmirror:8080/api/notification/UPDATE_POSITION`. Don't forget to pass the json object in the body of the request.

## Icons
To use a custom icon for a marker enter a valid url to an image file. Keep care of the size of the image. There is no rescaling.

For example: I place my icons in a subfolder of the module called "icons". A valid url can be `http://magicmirror:8080/modules/MMM-GoogleMaps-Tracking/icons/icon.png`.

## Label
The label can be any string, you can format it with CSS in the custom.css file if you want.

## Map-Style

You can generate your own map-style on https://mapstyle.withgoogle.com/. Then overwrite the json in the map-styles.js file to use your own style.

## Credits
Thanks to [Snille](https://github.com/Snille) for developing the label-feature. Here's an example of his usage. He tracks his cats outside with GPS trackers and a pet door for in/out status.

![Alt text](/examples/screenshotSnille.png "Example Screenshot of MMM-GoogleMaps-Tracking by Snille")

## Buy me a beer
Find it useful? Please consider buying me or other contributors a beer.

<a href="https://www.buymeacoffee.com/MartinGri" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

