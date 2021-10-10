import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GoogleMaps } from 'src/app/clases/googleMaps';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ClickMapMarker } from 'src/interfaces/events-interfaces/ClickMapMarker';
import { ClickTableJobs } from 'src/interfaces/events-interfaces/ClickTableJobs';
import { JobDetailDtoOutput } from 'src/interfaces/Jobs/JobDetailDtoOutput';
import {
  CustomMarker,
  LongLat,
} from '../../../interfaces/google-maps/googleMaps';

declare const google: any;

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss'],
})
export class LocationMapComponent
  extends GoogleMaps
  implements OnInit, AfterViewInit, OnChanges
{
  // inputs
  @Input() jobList: JobDetailDtoOutput[];

  //outputs

  // Global properties for google map
  @ViewChild('map') mapElement: any;
  map: any;

  constructor(private eventService: EventServiceService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jobList && changes['jobList'].currentValue) {
      const lngLat: LongLat = {
        lat: Number(this.jobList[0].latitude),
        lng: Number(this.jobList[0].longitude),
      };
      // initialization of Map
      this.initLocalMap(lngLat);
      // set the array of markers
      this.jobList.map((mark: JobDetailDtoOutput) => {
        this.addLocalMarker(this.prepareLocalMarker(mark));
      });
    }
  }

  ngOnInit(): void {
    this.subscribeTableRowClickEventFromTaskTable();
  }

  ngAfterViewInit(): void {}

  initLocalMap(lngLat: LongLat) {
    this.map = this.initMap(
      this.mapElement.nativeElement,
      { lat: lngLat.lat, lng: lngLat.lng },
      5
    );
  }

  prepareLocalMarker(marker: JobDetailDtoOutput) {
    const myMarker: CustomMarker = {
      title: marker.title,
      id: marker.id,
      lat: Number(marker.latitude),
      lng: Number(marker.longitude),
      status: marker.status,
      description: marker.description,
      updated_at: marker.updated_at,
    };
    return myMarker;
  }

  addLocalMarker(marker: CustomMarker) {
    // set the coordinates
    const latLng = new google.maps.LatLng(marker.lat, marker.lng);
    // The marker, positioned
    const newMarker = this.newMarker(latLng, this.map, marker.title, marker.id);
    // save all markers
    this.currentMapMarkers.push(newMarker);

    // set infowIndow to be displayed on each marker
    const contentInfoWindow = `<b>${marker.title}</b><br>
    <b>Status: ${marker.status}</b><br>
    <b>Description: ${marker.description}</b><br>
    <b>Updated at: ${new Date(
      marker.updated_at
    ).toLocaleDateString()} - ${new Date(
      marker.updated_at
    ).toLocaleTimeString()}</b><br>`;

    const infoWindow = this.setInfoWindow(contentInfoWindow, marker.id);
    // save all infoWindows with marker id
    this.infoWindows.push(infoWindow);
    this.clickEventOnMarker(newMarker, infoWindow);
  }

  // Events on maps
  clickEventOnMarker(newMarker: any, infoWindow: any) {
    // Trigger an event on Click in a marker
    google.maps.event.addListener(newMarker, 'click', () => {
      this.infoWindows.forEach((infoW) => infoW.close());
      infoWindow.open(this.map, newMarker);
      this.markerClickEvent(newMarker.id);
    });
  }

  selectLocalMarkerTableClick(id: number) {
    const selectedMarker = this.currentMapMarkers.find((x) => x.id === id);
    const selectedInfoWindow = this.infoWindows.find((x) => x.id === id);
    this.infoWindows.forEach((infoW) => infoW.close());
    selectedInfoWindow.open(this.map, selectedMarker);
  }

  // Emit a Marker Click Event to service
  markerClickEvent(markerId: number) {
    const event: ClickMapMarker = {
      id: markerId,
      evenName: 'markerClick',
    };
    this.eventService.emit<ClickMapMarker>(event);
  }

  subscribeTableRowClickEventFromTaskTable() {
    this.eventService
      .on<ClickTableJobs>()
      .subscribe((event: ClickTableJobs) => {
        if (event.evenName === 'tableJobClick') {
          this.selectLocalMarkerTableClick(event.id);
        }
      });
  }
}
