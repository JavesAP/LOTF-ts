export const capitalize = (text: string) => {
    return text.split('').map((letter, index) => {
        return index === 0 ? letter.toUpperCase() : letter.toLowerCase()
    }).join('')
}

export const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.split('').map((number, index) => {
        return Number(index + 1) % 2 === 0 ? `${number}-` : `${number}`
    }).join('')
}