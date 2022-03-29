import { Component } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  onExit() {
    const rta = confirm('Logica desde component, estas seguro de salir?');
    return rta;
  };

}
