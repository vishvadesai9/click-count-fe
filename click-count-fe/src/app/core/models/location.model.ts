export interface location {
    id: number,
    country: string,
    city: string,
    count: number,
    created_at: string,
    updated_at: string,
}

export interface ClickData {
    success: boolean,
    locations: location[],
    total_count: number
}
