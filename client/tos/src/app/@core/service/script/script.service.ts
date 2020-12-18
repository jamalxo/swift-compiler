import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  constructor(private http: HttpClient) {}

  public execScript(script: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/script/exec/`,
      script,
      options
    );
  }
}
