// 기존 인터페이스 정의
interface Duration {
    startDate: Date
    endDate: Date
}

interface Link {
    website: string
    github: string
    twitter: string
}

interface Prize {
    trackName: string
    prizeAmount: number
}

interface Hackathon {
    name: string
    duration: Duration
    links: Link
    prizes: Prize[]
    judgeList: string[]
    participantList: string[]
}

export const HackathonFactoryAddress = {
    "optimism":"0xEB34bb2aC2eb907f760Dfd6eEDE69cddDEB88E32",
    "linea":"0x4D43ba912eDb1b2525731ad4BA66Fd2231Ef48f0",
}
