class YouCanBookMeApi {
    constructor(email, password){
        this.baseUrl = null
        this.fetch = window.fetch
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        this.profiles = []
        this.email = email
        this.password = password
    }

    setCredentials (email, password) {
        this.email = email
        this.password = password

        this.setBaseUrl()
    }

    setBaseUrl () {
        this.baseUrl = `https://api.youcanbook.me/v1/${this.email}`
    }

    getRequestHeaders (type) {
        const correctType = ['POST', 'GET'].includes(type)
        if (correctType) {
            const auth = window.btoa(`${this.email}:${this.password}`)
            const returnObj = {
                method: type,
                mode: 'cors',
                headers: {
                    Authorization: `Basic ${auth}`
                }
            }
            if (type === 'POST') {
                returnObj.headers = {
                    ...returnObj.headers,
                    'Content-Type': 'application/json'
                }
            }
            return returnObj
        }
    }

    async book (date, firstName, lastName, emailAddress) {
        if (!this.email && !this.password && !this.profiles) {
            await this.getProfiles()
        }
        const { id } = this.profiles && this.profiles.length > 0 && this.profiles[0]
        const headers = this.getRequestHeaders('POST')

        const dateToIso = new Date(date).toISOString()

        headers.body = JSON.stringify({
            units: '1',
            timeZone: this.timeZone,
            startsAt: dateToIso,
            numberOfSlots: '1',
            answers: [
                {
                    code: 'EMAIL',
                    string: emailAddress
                }, {
                    code: 'FNAME',
                    string: firstName
                }, {
                    code: 'LNAME',
                    string: lastName
                }
            ]
        })
        const response = await this.fetch(`${this.baseUrl}/profiles/${id}/bookings`, headers)
        const responseJson = response.json()

        return responseJson
    }

    async getProfiles () {
        if (this.email && this.password) {
            const headers = this.getRequestHeaders('GET')

            const response = await this.fetch(`${this.baseUrl}/profiles`, headers)
            const responseJson = await response.json()

            // if we have only one profile this will be an object
            const convertedToArray = Array.isArray(responseJson)
                ? responseJson
                : [responseJson]

            this.profiles = convertedToArray

            return convertedToArray
        }

        throw new Error('Missing email and password')
    }

}

export default YouCanBookMeApi
