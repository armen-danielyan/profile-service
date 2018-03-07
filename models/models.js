const db = require('../database');

let GenderModel = db.Model.extend({
    tableName: 'gender',
    idAttribute: 'id',
    validations: {
        'name': [
            'isRequired',
            { method: 'isString', error: 'name should be string' }
        ]
    },
    patient() {
        return this.hasMany(PatientModel);
    },
    doctor() {
        return this.hasMany(DoctorModel);
    }
});

let PatientModel = db.Model.extend({
    tableName: 'patients',
    idAttribute: 'id',
    validations: {
        first_name: [
            'isRequired',
            { method: 'isString', error: 'first_name should be string' }
        ],
        last_name: [
            'isRequired',
            { method: 'isString', error: 'last_name should be string' }
        ],
        mid_name: [
            { method: 'isString', error: 'mid_name should be string' }
        ],
        birth_date: [
            'isRequired',
            { method: 'isDate', error: 'birth_date should be date' }
        ],
        country: [
            { method: 'isString', error: 'country should be string' }
        ],
        city: [
            { method: 'isString', error: 'city should be string' }
        ],
        sub: [
            { method: 'isString', error: 'sub should be string' }
        ],
        weight: [
            'isRequired',
            { method: 'isNumber', error: 'weight should be number' }
        ],
        height: [
            'isRequired',
            { method: 'isNumber', error: 'height should be number' }
        ],
        chronic_diseases: [
            { method: 'isString', error: 'chronic_diseases should be string' }
        ],
        allergies: [
            { method: 'isString', error: 'allergies should be string' }
        ],
        gender_id: [
            'isRequired',
            { method: 'isNumber', error: 'gender_id should be number' }
        ]
    },
    gender() {
        return this.belongsTo(GenderModel, 'gender_id');
    }
});

let DoctorModel = db.Model.extend({
    tableName: 'doctors',
    idAttribute: 'id',
    validations: {
        first_name: [
            'isRequired',
            { method: 'isString', error: 'first_name should be string' }
        ],
        last_name: [
            'isRequired',
            { method: 'isString', error: 'last_name should be string' }
        ],
        mid_name: [
            { method: 'isString', error: 'mid_name should be string' }
        ],
        birth_date: [
            'isRequired',
            { method: 'isDate', error: 'birth_date should be date formatted' }
        ],
        country: [
            { method: 'isString', error: 'country should be string' }
        ],
        city: [
            { method: 'isString', error: 'city should be string' }
        ],
        sub: [
            'isRequired',
            { method: 'isString', error: 'sub should be string' }
        ],
        gender_id: [
            'isRequired',
            { method: 'isNumber', error: 'gender_id should be number' }
        ]
    },
    gender() {
        return this.belongsTo(GenderModel, 'gender_id');
    },
    work() {
        return this.hasMany(WorkModel);
    },
    education() {
        return this.hasMany(EducationModel);
    }
}, {
    dependents: ['work', 'education']
});

let WorkModel = db.Model.extend({
    tableName: 'works',
    idAttribute: 'id',
    validations: {
        'name': [
            'isRequired',
            { method: 'isString', error: 'name should be string' }
        ],
        'country_city': [
            'isRequired',
            { method: 'isString', error: 'country_city should be string' }
        ],
        'start_date': [
            'isRequired',
            { method: 'isDate', error: 'start_date should be date' }
        ],
        'experience': [
            'isRequired',
            { method: 'isNumber', error: 'experience should be string' }
        ],
        'position': [
            { method: 'isString', error: 'position should be string' }
        ],
        'recommender': [
            { method: 'isString', error: 'recommender should be string' }
        ],
        'doctor_id': [
            'isRequired',
            { method: 'isNumber', error: 'doctor_id should be number' }
        ]
    },
    doctor() {
        return this.belongsTo(DoctorModel, 'doctor_id');
    }
});

let EducationModel = db.Model.extend({
    tableName: 'educations',
    idAttribute: 'id',
    validations: {
        'name': [
            'isRequired',
            { method: 'isString', error: 'name should be string' }
        ],
        'country_city': [
            'isRequired',
            { method: 'isString', error: 'country_city should be string' }
        ],
        'graduated': [
            'isRequired',
            { method: 'isDate', error: 'graduated should be date' }
        ],
        'faculty': [
            'isRequired',
            { method: 'isString', error: 'faculty should be float' }
        ],
        'profession': [
            { method: 'isString', error: 'profession should be string' }
        ],
        'doctor_id': [
            'isRequired',
            { method: 'isNumber', error: 'doctor_id should be number' }
        ]
    },
    doctor() {
        return this.belongsTo(DoctorModel, 'doctor_id');
    }
});

module.exports = {
    PatientModel,
    GenderModel,
    DoctorModel,
    WorkModel,
    EducationModel
};