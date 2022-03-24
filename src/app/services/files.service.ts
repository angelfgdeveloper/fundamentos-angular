import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrlFile = `${environment.API_URL_FILE}/api/files`;

  // https://young-sands-07814.herokuapp.com/api/files/dummy.pdf

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(`${this.apiUrlFile}/${url}`, { responseType: 'blob' })
    .pipe(
      tap(content => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrlFile}/upload`, dto, {
      // headers: {
      //   'Content-type': 'multipart/form-data'
      // }
    });

  }
}
