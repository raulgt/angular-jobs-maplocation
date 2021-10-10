import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { tableSelecteRow } from 'src/app/configurations/components-colors';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ClickMapMarker } from 'src/interfaces/events-interfaces/ClickMapMarker';
import { ClickTableJobs } from 'src/interfaces/events-interfaces/ClickTableJobs';
import { JobDetailDtoOutput } from 'src/interfaces/Jobs/JobDetailDtoOutput';


@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})

export class TaskTableComponent implements OnInit, OnChanges {

  // mat-table
  public tasksList: JobDetailDtoOutput[];
  public displayedColumns: string[] = ['id', 'title', 'status', 'assigned_to', 'created_at'];

  // Selected Row
  public rowSelected: number = 0;
  public tSelecteRow: string = tableSelecteRow;

  // Input JobsData
  @Input() jobList: any;

  constructor(private eventService: EventServiceService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jobList && changes["jobList"].currentValue) {
      this.showTaskData(changes["jobList"].currentValue);
    }
  }

  ngOnInit(): void {     
    this.subscribeMarkerClickEventFromLocationMap();
   }

  showTaskData(data: JobDetailDtoOutput[]) {
    this.tasksList = data;
  }

  getTableRecord(row: any){      
     this.tableRowClickEvent(row.id);
     this.selectTableRow(row.id);
  }

  // emit Table Row Click event to service
  tableRowClickEvent(jobId: number){
    const event : ClickTableJobs = {
      id: jobId,
      evenName: 'tableJobClick'
    };
    this.eventService.emit<ClickTableJobs>(event);
  }

  // subscription to click event over map markers in LocationMapComponent component
  subscribeMarkerClickEventFromLocationMap(){
    this.eventService.on<ClickMapMarker>().subscribe(
      (event: ClickMapMarker) => {
        if(event.evenName === 'markerClick'){               
          this.selectTableRow(event.id);
        }
      }
    )
  }


  selectTableRow(id: number){
    this.rowSelected = id;
  }

}



