import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../@core/service/script/script.service';

export interface Error {
  pos: string;
  msg: string;
  lineChar: {
    line: string;
    char: string;
  };
}

@Component({
  selector: 'tos-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  @ViewChild('input') input: ElementRef;

  @ViewChild('test') test: ElementRef;

  initialScript =
    'import Swift\nimport Foundation\nprint("Hello, World!");\nfofr index in 1...2 {\n    usleep(1000000);\n    print("\\(index) times 5 is \\(index * 5)")\n};';

  output = '';
  isCompiling = 0;
  exitCode = 0;
  errors = [] as any;
  errorsByPos = [] as Error[];

  scriptForm = new FormGroup({
    script: new FormControl(this.initialScript, Validators.required),
  });

  constructor(private router: Router, private scriptService: ScriptService) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.scriptForm.controls;
  }

  get shouldSpin(): boolean {
    return this.isCompiling === 1;
  }

  onSubmit(): void {
    if (this.scriptForm.invalid) {
      return;
    }

    this.isCompiling = 1;

    const script = {
      script: this.f.script.value,
    };

    this.scriptService.execScript(script).subscribe(
      (res) => {
        this.output = res.output;
        this.exitCode = res.exitCode;
        this.isCompiling = 2;
        this.errors = res.error;
        this.split();
      },
      (error) => {
        console.log(error);
        this.isCompiling = 2;
      }
    );
  }

  getLineChar(line: number, char: number): number {
    let pos = 0;
    const script: string = this.f.script.value;
    const separatedString = script.split('\n');
    for (let i = 0; i < line - 1; i++) {
      pos += separatedString[i].length;
    }
    return pos + char + 2;
  }

  goToError(line: any, char: any): void {
    this.input.nativeElement.focus();
    this.input.nativeElement.selectionStart = this.getLineChar(line, char);
    this.input.nativeElement.selectionEnd = this.getLineChar(line, char);
  }

  split(): void {
    this.errorsByPos = this.errors.map((error: any) => {
      const index = error.indexOf(' ');
      const pos = error.substr(0, index);
      let lineChar;
      if (pos) {
        lineChar = pos.match(/\d+/g).map(Number);
      }
      const msg = error.substr(index + 1);
      return {
        pos,
        msg,
        lineChar,
      };
    });
  }
}
