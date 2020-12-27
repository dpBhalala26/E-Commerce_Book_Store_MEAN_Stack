import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class Store<T> {
    state$: Observable<T>;
    private pState$: BehaviorSubject<T>;


    protected constructor(initialState: T) {
        this.pState$ = new BehaviorSubject<T>(initialState);
        this.state$ = this.pState$.asObservable();
    }

    // Synchronous
    get state() {
        return this.pState$.getValue();
    }

    protected setState(nextState: T): void {
        console.log(`########`);
        console.log(`Previous State was : `, this.state);
        this.pState$.next(nextState);
        console.log(`Current State is : `, this.state);
        console.log(`########`);
    }

    // Return state for selector function
    select<T>(selectorFunc: any): Observable<T> {
        return this.state$.pipe(distinctUntilChanged(), map(selectorFunc));
    }
}