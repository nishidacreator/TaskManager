import { Comment } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Modules/admin/admin.service';

@Component({
  selector: 'app-view-ticket-response',
  templateUrl: './view-ticket-response.component.html',
  styleUrls: ['./view-ticket-response.component.scss']
})
export class ViewTicketResponseComponent {
  constructor(private adminService:AdminService,private route:ActivatedRoute){}
  ngOnInit(){
    this.getComments()
    console.log(this.route.snapshot.params['id'])

  }
  comments : any[]=[]
  getComments(){
    this.adminService.getComment().subscribe((res)=>{
      console.log(res)
      this.comments = res.filter((x=>x.ticketId ==this.route.snapshot.params['id']))
      console.log(this.comments)
    })


  }

}
