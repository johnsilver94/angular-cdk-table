import { Routes } from "@angular/router"
import { MaterialTableComponent } from "./pages/material-table/material-table.component"
import { CdkTableComponent } from "./pages/cdk-table/cdk-table.component"

export const routes: Routes = [
	{ path: "material", component: MaterialTableComponent },
	{ path: "cdk", component: CdkTableComponent }
]
