import { Component } from '@angular/core';
import {NgxFileDropEntry} from 'ngx-file-drop';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
   
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file,droppedFile.relativePath)
          
          
          
          /*
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
           


          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          */  
          

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  
  public fileOver(event: any) {
    console.log('File over', event);
  }

  public fileLeave(event: any) {
    console.log('File leave', event);
  }  
}

