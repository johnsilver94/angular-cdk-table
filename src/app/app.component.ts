import { Component, OnInit, ViewChild } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CdkTableModule } from "@angular/cdk/table"
import { MatSort, MatSortable, MatSortModule } from "@angular/material/sort"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatTableDataSource } from "@angular/material/table"
import { User } from "./models/user.model"
import { debounceTime, distinctUntilChanged, Subject, tap } from "rxjs"
import { UsersService } from "./services/users.service"
import { CommonModule } from "@angular/common"
import { BrowserModule } from "@angular/platform-browser"
import { ROW_ANIMATION } from "./animations/row.animation"
import { UserQuery } from "./query/users.query"
import { HighlightSearch } from "./pipes/highlight.pipe"
import { PaginatorComponent } from "./components/paginator/paginator.component"

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		FormsModule,
		CdkTableModule,
		MatSortModule,
		ReactiveFormsModule,
		RouterOutlet,
		HighlightSearch,
		PaginatorComponent
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	providers: [UserQuery, HighlightSearch],
	animations: [ROW_ANIMATION]
})
export class AppComponent implements OnInit {
	users: MatTableDataSource<User>
	initialSort: MatSortable = {
		id: "id",
		start: "desc",
		disableClear: false
	}
	initialFilter = {
		website: "uk"
	}
	columnsToDisplay = ["id", "fullName", "email", "website"]
	queryForm: FormGroup

	nameQueryChanged: Subject<string> = new Subject<string>()
	@ViewChild("pagination", { static: true })
	// @ts-ignore
	paginator: PaginatorComponent
	// @ts-ignore
	@ViewChild(MatSort, { static: true }) sort: MatSort
	pageSize = 10

	domains: string[] = []

	constructor(
		private usersService: UsersService,
		public userQuery: UserQuery
	) {
		this.users = new MatTableDataSource()
		this.queryForm = this.createQueryForm()
	}

	ngOnInit(): void {
		// sort definition
		this.sort.sort(this.initialSort)
		// mat table definition
		this.users = new MatTableDataSource()
		this.users.filterPredicate = this.userQuery.createFilter()
		this.users.paginator = this.paginator
		this.users.sort = this.sort
		this.users.filter = this.userQuery.filter(this.initialFilter)

		// connect data to table
		this.usersService
			.getUsers()
			.pipe(
				tap((users) => {
					const domains = users.map((user) => user.website.split(".").slice(-1)[0])
					console.log("domains", domains)
					this.domains = [...new Set<string>(domains)]
					console.log("this.domains", this.domains)
				})
			)
			.subscribe((users) => (this.users.data = users))

		// form filter listener
		this.queryForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((filterValues) => {
			this.users.filter = this.userQuery.filter(filterValues)
		})
	}

	clearFilters() {
		this.queryForm.reset(this.createQueryForm().getRawValue())
	}

	createQueryForm() {
		return new FormGroup({
			fullName: new FormControl(""),
			email: new FormControl(""),
			website: new FormControl("")
		})
	}

	// filter on demand without forms
	manualFilter() {
		this.users.filter = this.userQuery.filter({
			website: "org",
			fullName: "ba"
		})
	}
}
