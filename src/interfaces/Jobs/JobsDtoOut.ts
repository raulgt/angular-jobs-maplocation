import { JobDetailDtoOutput } from "./JobDetailDtoOutput";


// the API response for this interface has more data, but we only take the necessary.
export interface JobsDtoOut{
    current_page: number;
    data: JobDetailDtoOutput[];
    total: number;
    last_page: number;
    per_page: number;
}