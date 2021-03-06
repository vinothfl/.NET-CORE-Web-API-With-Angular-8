import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UnitDetailService } from '../../shared/unit-detail.service';
//import { UnitDetail } from '../../shared/unit-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styles: []
})
export class UnitDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UnitDetailComponent>,
    private service: UnitDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.data.itemIndex == null) {//console.log('reset')
      this.resetForm();
    } else {
      console.log('no reset')
      // this.populateForm(pd);
      // this.formData = Object.assign({}, this.data.itemIndex);
      //  pd = ;
      this.service.formData = Object.assign({}, this.data.itemIndex);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: 0,
      Name: '',
      CreatedDate: null,
      ModifiedDate: null,
      CreatedBy: '',
      ModifiedBy: ''
    }
  }

  onUnitDetailSubmit(form: NgForm) {
    //form.value
    if (this.service.formData.Id == 0)
      this.insertRecord(form);

    else
      // update
      this.updateRecord(form);

  }
  insertRecord(form: NgForm) {
    //console.log(this.data);
    this.service.postUnitDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Unit detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putUnitDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Unit detail registerd');
        this.service.refreshList();
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }

}
