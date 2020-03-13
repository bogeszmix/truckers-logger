/**
 * Match for the following:
 * 001:59
 * 010:59
 * 111:59
 * 01:59
 * 1:59
 */
export enum WorkTimeRegex {
    // FORMAT = '^(?:(\d[0-9]?\d|[0-9]?\d|[0-9]):([0-5]?\d))$'
    FORMAT = '^(?:([0-9]?[0-9]?[0-9]):([0-5]?[0-9]))$'
}
