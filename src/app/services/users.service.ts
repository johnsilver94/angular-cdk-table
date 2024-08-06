import { Injectable } from "@angular/core"
import { delay, Observable, of } from "rxjs"
import { User } from "../models/user.model"
import USERS from "../data/users.json"

@Injectable({ providedIn: "root" })
export class UsersService {
	getUsers(): Observable<User[]> {
		// https://next.json-generator.com/4JbHJjvAF
		return of(USERS).pipe(delay(2000))
	}
}
