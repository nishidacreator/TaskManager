import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
@Component({
  selector: 'app-view-ticket-response',
  templateUrl: './view-ticket-response.component.html',
  styleUrls: ['./view-ticket-response.component.scss']
})
export class ViewTicketResponseComponent {
  data: any;
  constructor(private empService: EmployeeService,private adminService: AdminService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.getComments();
    console.log(this.route.snapshot.params['id']);
  }

  comments: any[] = [];
  ticketForm: FormGroup = this.fb.group({
    taskcompleted: [],
    completionComment: [''],
  });

  getComments() {
    this.adminService.getComment().subscribe((res) => {
      console.log(res);
      this.comments = res.filter((x) => x.ticketId == this.route.snapshot.params['id']);
      console.log(this.comments);
    });
  }

  onCheckboxChange() {
    // const taskcompleted=true;
  }

  submitForm() {
    let id = this.route.snapshot.params['id']
    console.log('id', id)
    console.log('Form submitted');
    console.log('Task Completed:', this.ticketForm.get('taskcompleted')?.value);
    console.log('Comment:', this.ticketForm.get('completionComment')?.value);

    let data = {
      taskcompleted: this.ticketForm.get('taskcompleted')?.value,
      completionComment: this.ticketForm.get('completionComment')?.value
    };
    console.log(data);

    this.empService.UpdateTicketCompltComment(data, id).subscribe(res =>{
      console.log(res)
    },
      (error) => {
        console.error('UpdateTicketCompltComment error:', error);
      }
    );

    this.clearControls();
  }

  clearControls(){
    this.ticketForm.reset()
    this.ticketForm.setErrors(null)
  }
}
