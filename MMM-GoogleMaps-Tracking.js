
Module.register("MMM-GoogleMaps-Tracking",{
    // Default module config.
    defaults: {
	apikey: 'your_api_key',
	lat: 'latitude',
    lon: 'longitude',
    initialLoadDelay: 1000,
    marker:[
    ]

    
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

        function calculateCenter(config){
            if(config.lat && config.lon){
                return [config.lat, config.lon];
            }

            totalLat = 0;
            totalLon = 0;
            for(let i = 0; i < self.config.marker.length; i++){
                totalLat += parseFloat(self.config.marker[i].lat);
                totalLon += parseFloat(self.config.marker[i].lon);
            }

            centerLat = totalLat / self.config.marker.length;
            centerLon = totalLon / self.config.marker.length;
            return [centerLat,centerLon];
        }
        setTimeout(function() {
           
            // Map
            self.map  = new google.maps.Map(
                document.getElementById(self.mapId), 
                    {
                    zoom:self.config.zoom, 
                    styles: mapStyles,
                    zoomControl:false,
                    streetViewControl:false,
                    scaleControl:false,
                    rotateControl:false,
                    panControl:false,
                    mapTypeControl:false,
                    fullscreenControl:false
                });

            //if no markers are defined, use the center coordinates for marker. just for backward compatibility
            if(!self.config.marker || self.config.marker.length == 0){
                self.config.marker = [];
                self.config.marker[0] = new Object();
                self.config.marker[0].lat = self.config.lat;
                self.config.marker[0].lon = self.config.lon;
            }

            bounds  = new google.maps.LatLngBounds();
            //set marker
            for(let i = 0; i < self.config.marker.length; i++){
                //default maps marker
                iconURL ="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png";
                if(self.config.marker[i].icon){
                    iconURL = self.config.marker[i].icon;
                }
                latitude = parseFloat(self.config.marker[i].lat);
                longitude = parseFloat(self.config.marker[i].lon);

                marker = new google.maps.Marker({
                    position:{
                        lat:latitude,
                        lng:longitude
                    },
                    animation: google.maps.Animation.DROP,
                    icon: iconURL,
                    map:self.map
                });

                latLng = new google.maps.LatLng(latitude, longitude);
                bounds.extend(latLng);
            }

            //center and zoom handling

            centerLatLon = calculateCenter(self.config);

            if(self.config.zoom){
                self.map.setZoom(self.config.zoom);
                self.map.setCenter(new google.maps.LatLng(
                    centerLatLon[0],
                    centerLatLon[1]
                  ));
            }
            else{
                self.map.fitBounds(bounds); //autozoom

                //setting center needs to be done after fitBounds is finished
                google.maps.event.addListenerOnce(self.map,'bounds_changed', function() {
                    self.map.setCenter(new google.maps.LatLng(
                        centerLatLon[0],
                        centerLatLon[1]
                      ));
              });
            }

        }, self.config.initialLoadDelay);

        return wrapper;

    },
    notificationReceived: function(notification, payload, sender) {
        var self = this;
        function detectChanges(payload){
            if(payload.lat && payload.lon && (self.config.lat != payload.lat || self.config.lon != payload.lon)){
                return true;
            }

            if(payload.marker && payload.marker.length != self.config.marker.length){
                return true;
            }
            if(payload.marker){
                for(let i = 0; i < payload.marker.length; i++){
                    if(payload.marker[i].lat != self.config.marker[i].lat || payload.marker[i].lon != self.config.marker[i].lon ||payload.marker[i].icon != self.config.marker[i].icon){
                        return true;
                    }
                }
            }
            
            return false;
        }
          
        if(notification === "UPDATE_POSITION"){
            if(detectChanges(payload)){
                self.config.lat = payload.lat;
                self.config.lon = payload.lon;
                self.config.marker = payload.marker;
                self.updateDom();
            }
        }
    }
});
