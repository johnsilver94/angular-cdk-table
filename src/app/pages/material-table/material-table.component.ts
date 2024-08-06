/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, Component, ViewChild } from "@angular/core"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"

export interface PeriodicElement {
	name: string
	position: number
	weight: number
	symbol: string
}
const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
	{ position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
	{ position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
	{ position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
	{ position: 5, name: "Boron", weight: 10.811, symbol: "B" },
	{ position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
	{ position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
	{ position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
	{ position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
	{ position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
]
/**
 * @title Table with sorting
 */
@Component({
	selector: "material-table",
	styleUrl: "./material-table.component.scss",
	templateUrl: "./material-table.component.html",
	standalone: true,
	imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule]
})
export class MaterialTableComponent implements AfterViewInit {
	displayedColumns: string[] = ["position", "name", "weight", "symbol"]
	dataSource = new MatTableDataSource(ELEMENT_DATA)

	// @ts-expect-error
	@ViewChild(MatSort) sort: MatSort
	// @ts-expect-error
	@ViewChild(MatPaginator) paginator: MatPaginator

	ngAfterViewInit() {
		this.dataSource.sort = this.sort
		this.dataSource.paginator = this.paginator
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.dataSource.filter = filterValue.trim().toLowerCase()

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage()
		}
	}
}
