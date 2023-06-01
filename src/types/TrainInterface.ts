export interface SpeedLimit {
    name: string;
    speedLimit: number
}

export interface Train {
    name: string;
    description: string;
    speedLimits: SpeedLimit[]
}