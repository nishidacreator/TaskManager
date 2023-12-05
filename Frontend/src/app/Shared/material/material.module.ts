import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    MatStepperModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    MatStepperModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
