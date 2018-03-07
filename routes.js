const package = require('./package.json'),
    express = require('express'),
    aws = require('aws-sdk'),
    { PatientModel, GenderModel, DoctorModel, WorkModel, EducationModel } = require('./models/models'),
    router = express.Router();

aws.config.update({
    'secretAccessKey': process.env.secretAccessKey,
    'accessKeyId': process.env.accessKeyId,
    'region': process.env.region
});


/**
 * Check version
 */
router.get('/info', (req, res) => {
    try {
        res.status(200)
            .send({
                name: package.name || '',
                version: package.version || '',
                env: process.env.env || ''
            });
    } catch(err) {
        res.send(resError(err));
    }
});

/**
 * Work Add
 */
router.post('/work/add', (req, res) => {
    let cognitoId = req.apiGateway.event.requestContext.authorizer.claims.sub,
        attributes = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        DoctorModel
            .forge({sub: cognitoId})
            .fetch()
            .then(result => {
                let doctorData = result.toJSON();
                attributes['doctor_id'] = doctorData.id;


                let Work = new WorkModel(attributes),
                    validationErrors = Work.validationErrors();

                if(validationErrors) {
                    res.send(resError(validationErrors));
                } else {
                    return Work
                        .save()
                        .then(model => {
                            res.send({name: 'success', data: model.toJSON()});
                        })
                        .catch(err => {
                            res.send(resError(err));
                        });
                }
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Works Add
 */
router.post('/works/add', (req, res) => {
    let cognitoId = req.apiGateway.event.requestContext.authorizer.claims.sub,
        attributesCollection = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        DoctorModel
            .forge({sub: cognitoId})
            .fetch()
            .then(result => {
                let doctorData = result.toJSON(),
                    worksPromise = [];
                attributesCollection.map(attributes => {
                    attributes['doctor_id'] = doctorData.id;
                    worksPromise.push(new WorkModel(attributes));
                    return attributes;
                });

                let j = worksPromise.length - 1,
                    validationErrors;
                while(j >= 0) {
                    validationErrors = worksPromise[j].validationErrors();
                    if(validationErrors) {
                        break;
                    }
                    j--;
                }

                if(validationErrors) {
                    res.send(resError(validationErrors));
                } else {
                    return Promise.all(worksPromise.map(fn => {
                        return new Promise((resolve, reject) => {
                            fn.save()
                                .then(data => {
                                    resolve(data);
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        })
                    }))
                        .then(result => {
                            res.send({name: 'success', data: result.map(item => { return item.toJSON(); })});

                        })
                        .catch(err => {
                            res.send(resError(err));
                        })
                }
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Work Update
 */
router.post('/work/update/:id', (req, res) => {
    let workId = req.params.id,
        attributes = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        let Work = new WorkModel({id: workId});
        Work
            .save(attributes, {patch: true})
            .then(model => {
                res.send({name: 'success', data: model.toJSON()})
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Work Get
 */
router.get('/work/:doctor_id', (req, res) => {
    let doctorId = req.params.doctor_id;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        let Work = new WorkModel();
        Work
            .query({where: {doctor_id: doctorId}})
            .fetchAll()
            .then(model => {
                res.send(model.toJSON());
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Work Remove
 */
router.get('/work/remove/:id', (req, res) => {
    let workId = req.params.id;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        let Work = new WorkModel();
        Work
            .query()
            .where({id: workId})
            .del()
            .then(model => {
                res.send({name: 'success'})
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Education Add
 */
router.post('/education/add', (req, res) => {
    let cognitoId = req.apiGateway.event.requestContext.authorizer.claims.sub,
        attributes = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        DoctorModel
            .forge({sub: cognitoId})
            .fetch()
            .then(result => {
                let doctorData = result.toJSON();
                attributes['doctor_id'] = doctorData.id;

                let Education = new EducationModel(attributes),
                    validationErrors = Education.validationErrors();

                if(validationErrors) {
                    res.send(resError(validationErrors));
                } else {
                    return Education
                        .save()
                        .then(model => {
                            res.send({name: 'success', data: model.toJSON()})
                        })
                        .catch(err => {
                            res.send(resError(err));
                        });
                }
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Educations Add
 */
router.post('/educations/add', (req, res) => {
    let cognitoId = req.apiGateway.event.requestContext.authorizer.claims.sub,
        attributesCollection = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
    DoctorModel
        .forge({sub: cognitoId})
        .fetch()
        .then(result => {
            let doctorData = result.toJSON(),
                educationPromise = [];
            attributesCollection.map(attributes => {
                attributes['doctor_id'] = doctorData.id;
                educationPromise.push(new EducationModel(attributes));
                return attributes;
            });

            let j = educationPromise.length - 1,
                validationErrors;
            while(j >= 0) {
                validationErrors = educationPromise[j].validationErrors();
                if(validationErrors) {
                    break;
                }
                j--;
            }

            if(validationErrors) {
                res.send(resError(validationErrors));
            } else {
                return Promise.all(educationPromise.map(fn => {
                    return new Promise((resolve, reject) => {
                        fn.save()
                            .then(data => {
                                resolve(data);
                            })
                            .catch(err => {
                                reject(err);
                            })
                    })
                }))
                    .then(result => {
                        res.send({name: 'success', data: result.map(item => { return item.toJSON(); })});

                    })
                    .catch(err => {
                        res.send(resError(err));
                    })
            }
        })
        .catch(err => {
            res.send(resError(err));
        });
    }
});


/**
 * Education Update
 */
router.post('/education/update/:id', (req, res) => {
    let educationId = req.params.id,
        attributes = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        let Education = new EducationModel({id: educationId});
        Education
            .save(attributes, {patch: true})
            .then(model => {
                res.send({name: 'success', data: model.toJSON()})
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Education Get
 */
router.get('/education/:doctor_id', (req, res) => {
    let doctorId = req.params.doctor_id;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {
        let Education = new EducationModel({id: doctorId});
        Education
            .query({where: {doctor_id: doctorId}})
            .fetchAll()
            .then(model => {
                res.send(model.toJSON());
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Gender Add
 */
router.post('/gender/add', (req, res) => {
    let attributes = req.body;

    let Gender = new GenderModel(attributes),
        validationErrors = Gender.validationErrors();

    if(validationErrors) {
        res.send(resError(validationErrors));
    } else {
        Gender
            .save()
            .then(model => {
                res.send({name: 'success', data: model.toJSON()})
            })
            .catch(err => {
                res.send(resError(err));
            });
    }
});


/**
 * Gender Update
 */
router.post('/gender/update/:id', (req, res) => {
    let genderId = req.params.id,
        attributes = req.body;

    let Gender = new GenderModel({id: genderId});
    Gender
        .save(attributes, {patch: true})
        .then(model => {
            res.send({name: 'success', data: model.toJSON()})
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Gender Remove
 */
router.get('/gender/remove/:id', (req, res) => {
    let genderId = req.params.id;

    let Gender = new GenderModel();
    Gender
        .query()
        .where({id: genderId})
        .del()
        .then(model => {
            res.send({name: 'success'})
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Gender List
 */
router.get('/gender', (req, res) => {
    let Gender = new GenderModel();
    Gender
        .fetchAll()
        .then(model => {
            res.send(model.toJSON());
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Gender Get
 */
router.get('/gender/:id', (req, res) => {
    let genderId = req.params.id;

    let Gender = new GenderModel({id: genderId});
    Gender
        .fetch()
        .then(model => {
            res.send(model.toJSON());
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Get doctor by id (internal)
 */
router.get('/internal/doctor/:id', (req, res) => {
    let userId = req.params.id;

    let Doctor = new DoctorModel({id: userId});
    Doctor
        .fetch({withRelated: ['gender', 'work', 'education']})
        .then(model => {
            res.send(model.toJSON());
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Get patient by id (internal)
 */
router.get('/internal/patient/:id', (req, res) => {
    let userId = req.params.id;

    let Doctor = new PatientModel({id: userId});
    Doctor
        .fetch({withRelated: ['gender']})
        .then(model => {
            res.send(model.toJSON());
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Delete doctor by id (internal)
 */
router.delete('/internal/doctor/:id', (req, res) => {
    let userId = req.params.id;

    let Doctor = new DoctorModel({id: userId});
    Doctor
        .destroy()
        .then(() => {
            res.send({name: 'success'});
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Get patient by id (internal)
 */
router.delete('/internal/patient/:id', (req, res) => {
    let userId = req.params.id;

    let Patient = new PatientModel({id: userId});
    Patient
        .destroy()
        .then(() => {
            res.send({name: 'success'});
        })
        .catch(err => {
            res.send(resError(err));
        });
});


/**
 * Doctor get patient info
 */
router.post('/getpatients', (req, res) => {
    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {

        let patientsCognitoIds = req.body.ids;

        PatientModel
            .forge()
            .query(qb => {
                qb.whereIn('sub', patientsCognitoIds);
            })
            .fetchAll()
            .then(model => {
                res.send(model.toJSON());
            })
            .catch(err => {
                res.send(resError(err));
            });

    }
});


/**
 * Doctor/Patient Add
 */
router.post('/add', (req, res) => {
    let cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider(),
        cognitoId = req.apiGateway.event.requestContext.authorizer.claims.sub,
        attributes = req.body;
    attributes['sub'] = cognitoId;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {

        let Doctor = new DoctorModel(attributes),
            validationErrors = Doctor.validationErrors();

        if(validationErrors) {
            res.send(resError(validationErrors));
        } else {
            Doctor
                .save()
                .then(model => {
                    let userData = model.toJSON();
                    let params = {
                        UserAttributes: [ { Name: 'custom:profile_id', Value: `${model.toJSON().id}` } ],
                        UserPoolId: process.env.DoctorUserPoolId,
                        Username: cognitoId
                    };
                    cognitoIdentityServiceProvider.adminUpdateUserAttributes(params, (err, data) => {
                        err ? res.send(resError(err)) : res.send({name: 'success', data: userData});
                    });
                })
                .catch(err => {
                    res.send(resError(err));
                });
        }

    } else if(userType === 'patient') {

        let Patient = new PatientModel(attributes),
            validationErrors = Patient.validationErrors();

        if(validationErrors) {
            res.send(resError(validationErrors));
        } else {
            Patient
                .save()
                .then(model => {
                    if(model) {
                        let userData = model.toJSON();
                        let params = {
                            UserAttributes: [ { Name: 'custom:profile_id', Value: `${userData.id}` } ],
                            UserPoolId: process.env.PatientUserPoolId,
                            Username: cognitoId
                        };
                        cognitoIdentityServiceProvider.adminUpdateUserAttributes(params, (err, data) => {
                            err ? res.send(resError(err)) : res.send({name: 'success', data: userData});
                        });
                    }
                })
                .catch(err => {
                    res.send(resError(err));
                });
        }

    }

});


/**
 * Doctor/Patient Update
 */
router.post('/update/:id', (req, res) => {
    let userId = req.params.id,
        attributes = req.body;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {

        let Doctor = new DoctorModel({id: userId});
        Doctor
            .save(attributes, {patch: true})
            .then(model => {
                res.send({name: 'success', data: model.toJSON()})
            })
            .catch(err => {
                res.send(resError(err));
            });

    } else if(userType === 'patient') {

        let Patient = new PatientModel({id: userId});
        Patient
            .save(attributes, {patch: true})
            .then(model => {
                res.send({name: 'success', data: model.toJSON()})
            })
            .catch(err => {
                res.send(resError(err));
            });

    }
});


/**
 * Doctor/Patient Check
 */
router.get('/check', (req, res) => {
    let cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider(),
        cognitoId = req.apiGateway.event.requestContext.authorizer.claims.sub;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {

        let params = {
            UserPoolId: process.env.DoctorUserPoolId,
            Username: cognitoId
        };

        cognitoIdentityServiceProvider.adminGetUser(params, function(err, data) {
            if (err) {
                res.send(resError(err.message));
            } else {

                let filteredAttrs = data.UserAttributes.filter(item => {
                    return item.Name === 'custom:profile_id'
                });

                if(filteredAttrs.length > 0) {
                    let doctorId = filteredAttrs[0].Value;
                    DoctorModel
                        .forge({id: doctorId})
                        .fetch({withRelated: ['gender', 'work', 'education']})
                        .then(model => {
                            res.send(model.toJSON());
                        })
                        .catch(err => {
                            res.send(resError(err));
                        });
                } else {
                    res.send(resError('Profile is not set on DB'));
                }
            }
        });


    } else if(userType === 'patient') {

        let params = {
            UserPoolId: process.env.PatientUserPoolId,
            Username: cognitoId
        };

        cognitoIdentityServiceProvider.adminGetUser(params, function(err, data) {
            if (err) {
                res.send(resError(err.message));
            } else {

                let filteredAttrs = data.UserAttributes.filter(item => {
                    return item.Name === 'custom:profile_id'
                });

                if(filteredAttrs.length > 0) {
                    let patientId = filteredAttrs[0].Value;
                    PatientModel
                        .forge({id: patientId})
                        .fetch({withRelated: ['gender']})
                        .then(model => {
                            res.send(model.toJSON());
                        })
                        .catch(err => {
                            res.send(resError(err));
                        });
                } else {
                    res.send(resError('Profile is not set on DB'));
                }
            }
        });

    }
});


/**
 * Patient get doctor info
 */
router.post('/getdoctors', (req, res) => {
    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'patient') {

        let doctorsCognitoIds = req.body.ids;

        DoctorModel
            .forge()
            .query(qb => {
                qb.whereIn('sub', doctorsCognitoIds);
            })
            .fetchAll()
            .then(model => {
                res.send(model.toJSON());
            })
            .catch(err => {
                res.send(resError(err));
            });

    }
});


/**
 * Doctor/Patient Get
 */
router.get('/:id', (req, res) => {
    let userId = req.params.id;

    let audId = req.apiGateway.event.requestContext.authorizer.claims.aud,
        userType = checkUserType(audId);

    if(userType === 'doctor') {

        let Doctor = new DoctorModel({id: userId});
        Doctor
            .fetch({withRelated: ['gender', 'work', 'education']})
            .then(model => {
                res.send(model.toJSON());
            })
            .catch(err => {
                res.send(resError(err));
            });

    } else if(userType === 'patient') {

        let Patient = new PatientModel({id: userId});
        Patient
            .fetch({withRelated: ['gender']})
            .then(model => {
                res.send(model.toJSON());
            })
            .catch(err => {
                res.send(resError(err));
            });

    }
});


/**
 * Prepare Error response
 */
function resError(msg) {
    console.log(msg);
    return { name: 'error', message: 'Something went wrang!' };
}

function checkUserType(audID) {
    let patientAudId = process.env.patientAudId,
        doctorAudId = process.env.doctorAudId;

    if(audID === patientAudId) {
        return 'patient';
    } else if(audID === doctorAudId) {
        return 'doctor';
    } else {
        return 0;
    }
}


module.exports = router;
