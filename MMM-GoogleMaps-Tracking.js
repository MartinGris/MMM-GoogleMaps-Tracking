
Module.register("MMM-GoogleMaps-Tracking",{
    // Default module config.
    defaults: {
	apikey: 'your_api_key',
	lat: 'latitude',
    lon: 'longitude',
    initialLoadDelay: 1000
    },
    
    getScripts: function() {
        return [
            this.file('map-styles.js')
        ];
    },
    getStyles: function() {	
		return ['MMM-GoogleMaps-Tracking.css']	
	},
    start: function () {
		self = this;
		self.loaded = false;
		var scriptSrc = "https://maps.googleapis.com/maps/api/js?key=" + self.config.apikey;
        Log.info("Starting module: " + this.name);
		
        function hasMapsScript(src){
            for(s of document.scripts){
                if(s.src == src)return true;
            }
            return false;
        }
        
        function waitMapsScript(){
            setTimeout(function(){
                try{
                    
                    if(google && google.maps && google.maps.Map){
                        self.loaded = true;
                        self.updateDom();
                        return;
                    }
                }catch(e){}
                waitMapsScript();
            },1000);
        }

		function loadScripts(scriptSrc){
			
			var scriptElement = document.createElement("script");
            scriptElement.type = "text/javascript";
            scriptElement.src = scriptSrc;
            document.body.appendChild(scriptElement);
            self.loaded = true;
            self.updateDom();
        }
        
        if(! hasMapsScript(scriptSrc)){
            loadScripts(scriptSrc);
        }
        else{
            waitMapsScript();
        }
	
    },

    getDom: function() {
        var self = this;
        var wrapper = document.createElement("div");
        self.map = ""; 
        self.mark = "";

        if (!self.loaded) {
            wrapper.innerHTML = this.translate("LOADING");
            wrapper.className = "dimmed light small";
            return wrapper;
        }
        var mapElement = document.createElement("div");
		
		// map div creation
        self.mapId = self.identifier + "_gmap";
        Log.info("self.mapId:  " + self.mapId)
        mapElement.id = self.mapId;
        mapElement.classList.add("map-canvas");
        wrapper.appendChild(mapElement);

        var latitutde = this.config.lat;
        var longitude = this.config.lon;

        setTimeout(function() {
           
            // Map
            Log.info("latitutde: " + latitutde);
            Log.info("longitude: " + longitude);
            self.map  = new google.maps.Map(
                document.getElementById(self.mapId), 
                    {
                        center:{
                                lat:parseFloat(self.config.lat),
                                lng:parseFloat(self.config.lon)
                        },
                    zoom:16, 
                    styles: mapStyles,
                    zoomControl:false,
                    streetViewControl:false,
                    scaleControl:false,
                    rotateControl:false,
                    panControl:false,
                    mapTypeControl:false,
                    fullscreenControl:false
                });
            // Marker
            self.mark = new google.maps.Marker({
                position:{
                    lat:parseFloat(self.config.lat),
                    lng:parseFloat(self.config.lon)
                },
                animation: google.maps.Animation.DROP,
                map:self.map
            });

        }, self.config.initialLoadDelay);

        return wrapper;

    },
    notificationReceived: function(notification, payload, sender) {
          
        if(notification === "UPDATE_POSITION"){
            if(payload.lat && payload.lon && (this.config.lat != payload.lat || this.config.lon != payload.lon)){
                this.config.lat = payload.lat;
                this.config.lon = payload.lon;
                this.updateDom();
            }

        }
    }
});
