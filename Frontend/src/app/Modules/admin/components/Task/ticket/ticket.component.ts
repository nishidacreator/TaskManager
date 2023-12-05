import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Ticket } from '../../../Models/ticket';
import { MatDialog } from '@angular/material/dialog';
import { TicketViewerComponent } from '../ticket-viewer/ticket-viewer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { getStickyFooterScrollbar } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  id: number | undefined;

  ngOnInit(): void {
    this.getTickets()
    console.log(this.route.snapshot.params['id'])

  }

  constructor(private adminService : AdminService, private dialog: MatDialog, private router: Router,
    private route:ActivatedRoute){}
  displayedColumns: string[] = [ 'title', 'description','file','status' ,'action'];


  tickets : Ticket[]=[]
  getTickets(){
    this.adminService.getTickets().subscribe((res)=>{
      this.tickets = res;
      console.log(this.tickets);
    })
  }

  openDialog(path: any){
    this.dialog.open(TicketViewerComponent,{
      data:{url:path}
    })
  }

  tkt:any[]=[]



  responseToComment(id : number){
    console.log(id)
    let data ={
      status:'Responded',
    }
    console.log(data)
    this.adminService.updateTicketStatus(data,id).subscribe((res)=>{
      console.log(res)
    })

    this.router.navigate(['/admin/ticketResponse/', id]);
  }
}


