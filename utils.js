const db = require('./db')

//添加属性
function handleData(data) {
    if (!data.cover.startsWith('http://')) {
        data['cover'] = `${db.resUrl}/img${data.cover}`
    }
    data['selected'] = false
    data['private'] = false
    data['cache'] = false
    data['haveRead'] = 0
    return data
}

const category = [
    'Biomedicine',
    'BusinessandManagement',
    'ComputerScience',
    'EarthSciences',
    'Economics',
    'Engineering',
    'Education',
    'Environment',
    'Geography',
    'History',
    'Laws',
    'LifeSciences',
    'Literature',
    'SocialSciences',
    'MaterialsScience',
    'Mathematics',
    'MedicineAndPublicHealth',
    'Philosophy',
    'Physics',
    'PoliticalScienceAndInternationalRelations',
    'Psychology',
    'Statistics'
]

module.exports = {
    handleData,
    category
}