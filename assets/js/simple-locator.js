function openInfoWindow(o){return google.maps.event.trigger(markers[o],"click"),googlemap.panTo(markers[o].getPosition()),googlemap.fitBounds(markers[o].getPosition()),googlemap.setZoom(12),!1}function wpsl_after_render(){}function wpsl_click_marker(){}var markers=[],googlemap="";jQuery(function(o){function e(e){if("."===wpsl_locator_options.mapcont.charAt(0))var t=o(e).find(wpsl_locator_options.mapcont);else var t=o(wpsl_locator_options.mapcont);if("."===wpsl_locator_options.resultscontainer.charAt(0))var s=o(e).find(wpsl_locator_options.resultscontainer);else var s=o(wpsl_locator_options.resultscontainer);return formelements={parentdiv:o(e),errordiv:o(e).find(".wpsl-error"),map:t,results:s,distance:o(e).find(".distanceselect"),zip:o(e).find(".zipcode"),latitude:o(e).find(".latitude"),longitude:o(e).find(".longitude"),unit:o(e).find(".unit")}}function t(e){var t=o(e.zip).val();geocoder=new google.maps.Geocoder,geocoder.geocode({address:t},function(t,r){if(r==google.maps.GeocoderStatus.OK){var a=t[0].geometry.location.lat(),l=t[0].geometry.location.lng();o(e.latitude).val(a),o(e.longitude).val(l),s(e)}else o(e.errordiv).text("Address could not be found at this time.").show(),o(e.results).hide()})}function s(e){o.ajax({url:wpsl_locator.ajaxurl,type:"post",datatype:"json",data:{action:"locate",zip:o(e.zip).val(),locatorNonce:wpsl_locator.locatorNonce,distance:o(e.distance).val(),latitude:o(e.latitude).val(),longitude:o(e.longitude).val(),unit:o(e.unit).val()},success:function(t){console.log(t),"error"===t.status?(o(e.errordiv).text(t.message).show(),o(e.results).hide()):r(t,e)}})}function r(e,t){if(e.result_count>0){if(1===e.result_count)var s=wpsl_locator.location;else var s=wpsl_locator.locations;var r="<h3>"+e.result_count+" "+s+" "+wpsl_locator.found_within+" "+e.distance+" "+e.unit+" of "+e.zip+"</h3><ul>";for(i=0;i<e.results.length;i++){r=r+"<li data-result="+i+"><strong>",r=r+'<a href="'+e.results[i].permalink+'">',r+=e.results[i].title,r+="</a></strong><br />",r=r+"<em>"+wpsl_locator.distance+": "+e.results[i].distance+" "+e.unit+"</em><br />",e.results[i].address&&(r=r+e.results[i].address+"<br />"+e.results[i].city+", "+e.results[i].state+" "+e.results[i].zip);var l=e.results[i].phone,n=e.results[i].website;l&&(r=r+"<br />"+wpsl_locator.phone+": "+l),n&&(r=r+'<br /><a href="'+n+'" target="_blank">'+n+"</a>"),r+='<br /><a href="#" class="infowindow-open map-link" onClick="event.preventDefault(); openInfoWindow('+i+');">'+wpsl_locator.showonmap+"</a>",r+="</li>"}r+="</ul>",o(t.results).removeClass("loading").html(r),o(t.map).show(),o(t.zip).val("").blur(),a(e,t),wpsl_after_render()}else o(t.errordiv).text("No results found.").show(),o(t.results).hide()}function a(e,t){markers=[];var s=wpsl_locator.mapstyles;if(""!==s)var s=o.parseJSON(s);var r,a,l,n=o(t.map)[0],i="show"===wpsl_locator_options.mapcontrols?!1:!0,p=wpsl_locator.mappin?wpsl_locator.mappin:"",u=new google.maps.LatLngBounds,c={mapTypeId:"roadmap",mapTypeControl:!1,zoom:8,styles:s,panControl:!1,disableDefaultUI:i},d=[],g=new google.maps.InfoWindow;r=new google.maps.Map(n,c);for(var l=0,m=e.results.length;m>l;l++){var f=e.results[l].title,w=e.results[l].latitude,v=e.results[l].longitude,_=e.results[l].permalink,h=[f,w,v,_];d.push(h)}for(l=0;l<d.length;l++){var k=new google.maps.LatLng(d[l][1],d[l][2]);u.extend(k),a=new google.maps.Marker({position:k,map:r,title:d[l][0],icon:p}),google.maps.event.addListener(a,"click",function(o,e){return function(){g.setContent("<h4>"+d[e][0]+'</h4><p><a href="'+d[e][3]+'">'+wpsl_locator.viewlocation+"</a></p>"),g.open(r,o),wpsl_click_marker(o,e)}}(a,l)),markers.push(a),r.fitBounds(u)}var b=google.maps.event.addListener(r,"bounds_changed",function(){google.maps.event.removeListener(b)});googlemap=r}o(".wpslsubmit").on("click",function(s){s.preventDefault();var r=o(this).parents(".simple-locator-form"),a=e(r);o(a.errordiv).hide(),o(a.map).hide(),o(a.results).empty().addClass("loading").show(),t(a)})});