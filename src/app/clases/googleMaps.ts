declare const google: any;

export class GoogleMaps {
  /**
   *
   */

   public currentMapMarkers: any[] = [];
   public infoWindows: any[] = [];


  constructor() {}

  public initMap(mapElement: any, uluru: object, zoom: number) {
    return new google.maps.Map(mapElement, {
      center: uluru,
      zoom: zoom,
    });
  }

  public newMarker(latLng: any, map: any, title: string, id: number) {
    return new google.maps.Marker({
      id: id,
      position: latLng,
      map: map,
      title: title,
    });
  }

  public setInfoWindow(contentInfoWindow: string, id: number) {
    return new google.maps.InfoWindow({
      content: contentInfoWindow,
      id: id
    });
  }
}
