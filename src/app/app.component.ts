import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
	styleUrl: "./app.component.scss",
	templateUrl: "./app.component.html"
})
export class AppComponent {}
