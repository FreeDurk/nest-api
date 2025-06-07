import { TasksStatus } from "../tasks.model";

export class TaskFilterDto {
    status?: TasksStatus;
    search?: string;
}