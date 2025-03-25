import { signal } from '@angular/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RickService } from './service/rickService';
import { PersonagemModel } from './models/apiModel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ricknmorty-webpage';

  apiService = inject(RickService)
  rickModel = signal(new PersonagemModel());
  async ngOnInit() {
    this.rickModel.set(await this.apiService.consultar_por_id(1));
  }

}
