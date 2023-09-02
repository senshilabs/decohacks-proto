export const unixTimeToDate = (unixTime: number): Date => new Date(unixTime * 1000)
export const unixTimeToDateString = (unixTime: number): string => unixTimeToDate(unixTime).toLocaleString()
export const unixTimeStringToDateString = (unixTimeString: string): string =>
    unixTimeToDateString(Number(unixTimeString))
export const unixTimeStringToDate = (unixTimeString: string): Date => unixTimeToDate(Number(unixTimeString))    

export const dateStringToUnixTime = (dateString: string): number => new Date(dateString).getTime() / 1000
