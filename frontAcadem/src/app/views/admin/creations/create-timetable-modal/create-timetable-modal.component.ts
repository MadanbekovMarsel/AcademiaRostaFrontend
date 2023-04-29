import {Component, Inject} from '@angular/core';
import {GroupService} from "../../../../service/group.service";
import {Group} from "../../../../models/Group";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Timetable} from "../../../../models/Timetable";

@Component({
  selector: 'app-create-timetable-modal',
  templateUrl: './create-timetable-modal.component.html',
  styleUrls: ['./create-timetable-modal.component.css']
})
export class CreateTimetableModalComponent {
  public timetableForm: FormGroup;
  group!: Group;
  constructor(private groupService: GroupService,
              public dialogRef: MatDialogRef<CreateTimetableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.group = data;
    this.timetableForm = this.createTimetableForm();
  }

  createTimetableForm():FormGroup{
    return this.fb.group({
      mondayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)],)],
      mondayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
      tuesdayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)])],
      tuesdayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
      wednesdayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)])],
      wednesdayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
      thursdayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)])],
      thursdayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
      fridayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)])],
      fridayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
      saturdayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)])],
      saturdayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
      sundayHH:['',Validators.compose([Validators.max(23),Validators.min(0),Validators.maxLength(2)])],
      sundayMM:['',Validators.compose([Validators.max(59),Validators.min(0),Validators.maxLength(2)])],
    });
  }

  save() {
    this.groupService.setTimetableToGroup(this.group.name,{
      monday: (this.timetableForm.value.mondayHH)? this.timetableForm.value.mondayHH + ":" + this.timetableForm.value.mondayMM:"undefined",
      tuesday: (this.timetableForm.value.tuesdayHH)? this.timetableForm.value.tuesdayHH + ":" + this.timetableForm.value.tuesdayMM:"undefined",
      wednesday: (this.timetableForm.value.wednesdayHH)? this.timetableForm.value.wednesdayHH + ":" + this.timetableForm.value.wednesdayMM:"undefined",
      thursday: (this.timetableForm.value.thursdayHH)? this.timetableForm.value.thursdayHH + ":" + this.timetableForm.value.thursdayMM:"undefined",
      friday: (this.timetableForm.value.fridayHH)? this.timetableForm.value.fridayHH + ":" + this.timetableForm.value.fridayMM:"undefined",
      saturday: (this.timetableForm.value.saturdayHH)? this.timetableForm.value.saturdayHH + ":" + this.timetableForm.value.saturdayMM:"undefined",
      sunday: (this.timetableForm.value.sundayHH)? this.timetableForm.value.sundayHH + ":" + this.timetableForm.value.sundayMM:"undefined",
    }).subscribe(data =>{
      console.log(data);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
