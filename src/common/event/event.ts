export type WorkerEvent = WorkerEvent.UserCreated | WorkerEvent.UserUpdated;

export namespace WorkerEvent {
    interface BaseEvent<T extends string, U extends object> {
        name: T;
        payload: U;
    }

    export const UserCreated = "user.created";
    export type UserCreated = BaseEvent<typeof UserCreated, { userId: string }>;

    export const UserUpdated = "user.updated";
    export type UserUpdated = BaseEvent<typeof UserUpdated, { userId: string }>;
}
