export type Timestamp = { seconds: number }

export interface IOcurrency {
    name: string,
    environment: string,
    phone: string,
    description: string,
    fileName?: string,
    when: Timestamp,
    solved?: boolean,
    key?: string
}