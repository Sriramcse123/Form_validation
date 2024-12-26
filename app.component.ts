import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employeeForm!: FormGroup;
  title = 'employee-form'
  submitted = false;
  files: Array<any>=[];

  dropped(event:any):void{
    console.log('Files Dropped: ',event);

    for(let file of event.files){
      if(file.fileEntry.isFile){
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file((fileData:File)=>{
          console.log('File name:',fileData.name);
          console.log('File Size: ',fileData.size);
          console.log('File type:', fileData.type);
        });
      }
      this.files.push(file);
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      EmployeeName: ['', [Validators.required, Validators.minLength(3)]],
      Gender: ['', Validators.required],
      Contact: ['', [Validators.required, Validators.minLength(10)]],
      DOB: ['', Validators.required],
      Address: ['', Validators.required]
    });
  }
  fileOver(event: any): void {
    console.log('File over:', event);
  }

  // Handle when a file leaves the drop area
  fileLeave(event: any): void {
    console.log('File leave:', event);
  }



  get EmployeeName() { return this.employeeForm.get('EmployeeName'); }
get Gender() { return this.employeeForm.get('Gender'); }
get Contact() { return this.employeeForm.get('Contact'); }
get DOB() { return this.employeeForm.get('DOB'); }
get Address() { return this.employeeForm.get('Address'); }


  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      console.log('Invalid');
      alert('Please fill in all required fields');
      return;
    }
     else
    console.log(this.employeeForm.value);
    this.storeFormData();
  }

  storeFormData(){
    const formData = this.employeeForm.value;
    localStorage.setItem('employeeFormData', JSON.stringify(formData));  // Store in localStorage
    sessionStorage.setItem('employeeFormData', JSON.stringify(formData));  // Store in sessionStorage
  }
   // Store the files in localStorage or sessionStorage
   storeFiles() {
    const filesData = this.files.map(file => ({
      relativePath: file.relativePath,
      size: file.size,
      type: file.type
    }));
    
    // Store in localStorage
    localStorage.setItem('employeeFiles', JSON.stringify(filesData));
    
    // Store in sessionStorage
    sessionStorage.setItem('employeeFiles', JSON.stringify(filesData));
  }

  // Load stored data from localStorage or sessionStorage
  loadStoredData() {
    // Check if there's any stored form data and populate the form
    const storedFormData = localStorage.getItem('employeeFormData') || sessionStorage.getItem('employeeFormData');
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      this.employeeForm.patchValue(formData);  // Fill the form with the stored data
    }

    // Check if there are any stored files and load them into the file array
    const storedFiles = localStorage.getItem('employeeFiles') || sessionStorage.getItem('employeeFiles');
    if (storedFiles) {
      this.files = JSON.parse(storedFiles);
    }
  }
}

