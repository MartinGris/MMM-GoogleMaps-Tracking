# MMM-GoogleMaps-Tracking


A module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) for tracking a geo-location with google maps and MagicMirror notifications.

## Using the module

To use this module, clone this repo to your `MagicMirror/modules/` directory.

`git clone https://github.com/MartinGris/MMM-GoogleMaps-Tracking`

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
			   lat: '<INIT_LATITUDE>',
			   lon: '<INIT_LONGITUDE>'
			   
		   }
		}

    ]
}
```

## Configuration options

| Option               | Description
|--------------------- |-----------
| `key`                | *Required* Google api key. See below for help. <br>**Type:** `string`
| `lat`  			   | *Required* Latitude used after initialization  <br>**Type:** `string`
| `lon`  			   | *Required* Longitude used after initialization  <br>**Type:** `string`


## Google API Key

Obtain an api key at [Google Developer's page](https://developers.google.com/maps/documentation/javascript/).

## Notification
Use 'UPDATE_POSITION' notification for updating the location. Pass latitude and longitude in a payload object:
```js
	{
		payload:{
			lat: <LATITUDE>,
			lon: <LONGITUDE>
				}
	}
```

You can use the [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) module and the rest api for remote access. For example this simple GET request will update the marker on the map: 'http://magicmirror:8080/api/notification/UPDATE_POSITION/lat?lat=<LATITUDE>&lon=<LONGITUDE>'


## Buy me a beer
Find it useful? Please consider buying me or other contributors a beer.

<a href="https://www.buymeacoffee.com/MartinGrisard" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

