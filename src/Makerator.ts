import { ChildProcessWithoutNullStreams } from 'child_process'
import { fromEvent, Observable } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

const anythingToString = (anything: any) => anything.toString()

export async function executeTask(task: ChildProcessWithoutNullStreams) {
    return new Observable(observer => {
        const data$ = fromEvent(task.stdout, 'data')
        const complete$ = fromEvent(task, 'exit')
        data$
            .pipe(map(anythingToString), takeUntil(complete$))
            .subscribe(observer)
    })
}
