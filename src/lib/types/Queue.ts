
export type QueueItemStatus = 'completed' | 'queued' | 'in_progress' | 'cancelled'

// Image data will follow when my backend continues
export type QueueItem = {
    id: number
    batchID: number
    status: QueueItemStatus
    createdAt: number
    updatedAt: number
    startedAt?: number
    completedAt?: number
}
