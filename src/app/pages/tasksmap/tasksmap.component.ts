import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { JobLocationService } from 'src/app/services/job-location.service';
import { JobDetailDtoOutput } from 'src/interfaces/Jobs/JobDetailDtoOutput';
import { JobsDtoOut } from 'src/interfaces/Jobs/JobsDtoOut';
import { UserAuthInfoDtoOutput } from 'src/interfaces/user-authentication/UserAuthInfoDtoOutput';

@Component({
  selector: 'app-tasksmap',
  templateUrl: './tasksmap.component.html',
  styleUrls: ['./tasksmap.component.scss']
})
export class TasksmapComponent implements OnInit {
  //footer input
  public userDetail: UserAuthInfoDtoOutput;
  //task-table input
  public jobList:JobDetailDtoOutput[];

  constructor(private route: ActivatedRoute, private jobService: JobLocationService) { }

  ngOnInit(): void {
    this.userDetail = this.route.snapshot.data['userDetail'];
    this.retriveJobData();
  }

  retriveJobData(){
    this.jobService.getJobs()
    .pipe(
      tap((res: JobsDtoOut) => { 
       this.jobList = res.data;
    })
    ).subscribe();
  }

}
