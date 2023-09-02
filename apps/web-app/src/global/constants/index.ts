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

// 더미 데이터
export const hackathonInfos: Hackathon[] = [
    {
        name: "Tech Innovators 2023",
        duration: {
            startDate: new Date("2023-10-15"),
            endDate: new Date("2023-10-17")
        },
        links: {
            website: "https://techinnovators2023.com",
            github: "https://github.com/techinnovators2023",
            twitter: "https://twitter.com/techinnovators23"
        },
        prizes: [
            {
                trackName: "AI Solutions",
                prizeAmount: 1000
            },
            {
                trackName: "Web Development",
                prizeAmount: 2000
            },
            {
                trackName: "prize1",
                prizeAmount: 1500
            },
            {
                trackName: "prize2",
                prizeAmount: 500
            },
            {
                trackName: "prize3",
                prizeAmount: 300
            }
        ],
        judgeList: ["Dr. Emily Stone", "Prof. Robert Downey"],
        participantList: ["John Doe", "Jane Smith"]
    },
    {
        name: "EcoTech Challenge 2023",
        duration: {
            startDate: new Date("2023-11-05"),
            endDate: new Date("2023-11-07")
        },
        links: {
            website: "https://ecotechchallenge.com",
            github: "https://github.com/ecotech2023",
            twitter: "https://twitter.com/ecotech_challenge"
        },
        prize: {
            tracks: [
                {
                    trackName: "Sustainable Tech",
                    prizeAmount: [1700, 850, 425]
                },
                {
                    trackName: "Clean Energy Solutions",
                    prizeAmount: [1600, 800, 400]
                }
            ]
        },
        judgeList: ["Dr. Angela White", "Prof. Brian Johnson"],
        participantList: ["Lucas Green", "Michelle Turner"]
    },
    {
        name: "FutureTech Summit 2023",
        duration: {
            startDate: new Date("2023-12-12"),
            endDate: new Date("2023-12-14")
        },
        links: {
            website: "https://futuretechsummit.com",
            github: "https://github.com/futuretech2023",
            twitter: "https://twitter.com/futuretech_summit"
        },
        prize: {
            tracks: [
                {
                    trackName: "Virtual Reality",
                    prizeAmount: [2000, 1000, 500]
                },
                {
                    trackName: "Robotics & Automation",
                    prizeAmount: [1800, 900, 450]
                }
            ]
        },
        judgeList: ["Dr. Isabelle Gomez", "Prof. Ethan Bell"],
        participantList: ["Oliver Clark", "Sophia Brown"]
    }
]

export const HackathonFactoryAddress = {
    "optimism":"0xdef88dBF467A98c1Ea1AA87b22B2Bc9e98d1a79C",
    "linea":"0xff9a39379F660AFC563e3749aCaadCbf76F3fC32",
}
