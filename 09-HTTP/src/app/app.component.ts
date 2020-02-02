import { Component } from '@angular/core';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appName = this.serverService.getAppName();

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serverService: ServersService){}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave(){
   this.serverService.storeServer(this.servers).subscribe(
     (response) => { console.log(response) },
     (error) => { console.log(error) }
   );
  }

  onGet(){
      this.serverService.getServer().subscribe(
        // (response: Response) => {

        //   // HTTPCLient automatically calls response.json so no need to call by our own
        //   // const data = response.json();

        //   console.log(response);
        // },

        (server :any[]) => this.servers = server,

        (error) => console.log(error)
      );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
