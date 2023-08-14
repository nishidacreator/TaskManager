import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-viewer',
  templateUrl: './ticket-viewer.component.html',
  styleUrls: ['./ticket-viewer.component.scss']
})
export class TicketViewerComponent {
  constructor(@Inject(MAT_DIALOG_DATA)public data: any) { }

  pdfSrc = "./assets/img/bg.jpg"
  ngOnInit(): void {
    console.log(this.data)
  }
}
