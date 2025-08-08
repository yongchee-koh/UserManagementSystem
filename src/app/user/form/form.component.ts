import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  
  @Input() userDetail?: User;
  @Input() addForm?: boolean;
  @Input() editForm?: boolean;
  //@Input() userForm!: FormGroup; // Input for the form group, if needed

  @Output() saveUser = new EventEmitter<User>();
  @Output() addUser = new EventEmitter<User>();
  @Output() addFormToggle = new EventEmitter<boolean>();
  @Output() editFormToggle = new EventEmitter<boolean>();
  
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.userForm = this.fb.group({
      name: ['', Validators.required], // Defines default values for the form controls
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email validation
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.fb.group({
          lat: [''],
          lng: ['']
        })
      }),
      phone: [''],
      website: [''],
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      }) 
    }); 
  }

  // Ensure all returned FormGroups
  get addressGroup(): FormGroup {
    return this.userForm.get('address') as FormGroup;
  }
  get geoGroup(): FormGroup {
    return this.addressGroup.get('geo') as FormGroup;
  }
  get companyGroup(): FormGroup {
    return this.userForm.get('company') as FormGroup;
  }

  // Change data in the form
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userDetail'] && this.userDetail) {
      this.userForm.patchValue(this.userDetail);
    }
  }

  
  ngOnInit(): void {
    if (this.userDetail) {
      this.userForm.patchValue(this.userDetail);
    }
  }
  
  // Check if the form is valid
  isFormInvalid(): boolean {
    return this.userForm.invalid;
  }

  save(){
    if(this.userForm.invalid) {
      console.error('Form is invalid. Missing details detected.');
      return;
    }

    console.log('Form edit input:', this.userForm.value);
    this.saveUser.emit(this.userForm.value);
    this.editFormToggle.emit(false); // Notify parent to close the edit form
  }

  add(){
    if(this.userForm.invalid) {
      console.error('Form is invalid. Missing details detected.');
      return;
    }
    
    console.log('Form add input:', this.userForm.value);
    this.addUser.emit(this.userForm.value);
    this.addFormToggle.emit(false); // Notify parent to close the add form
  }

  cancel() {
    this.addForm = false; // Reset add mode
    this.editForm = false; // Reset edit mode
    this.addFormToggle.emit(false); 
    this.editFormToggle.emit(false);
  }
  

}
