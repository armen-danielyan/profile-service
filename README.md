# Profile Service


## Content

  * [Patients](#Patient)
    * [Get Patient](##Get-Patient)
    * [Add Patient](##Add-Patient)
    * [Update Patient](##Update-Patient)
    * [Check Patient](##Check-Patient)
    * [Get Doctor Info](##Get-Doctor-Info)
  * [Doctors](#Doctors)
    * [Get Doctor](##Get-Doctor)
    * [Add Doctor](##Add-Doctor)
    * [Update Doctor](##Update-Doctor)
    * [Check Doctor](##Check-Doctor)
    * [Get Patient Info](##Get-Patient-Info)
  * [Works](#Works)
    * [Add Work](##Add-Work)
    * [Add Works](##Add-Works)
    * [List Works](##List-Works)
    * [Update Work](##Update-Work)
    * [Remove Work](##Remove-Work)
  * [Educations](#Educations)
    * [Add Education](##Add-Education)
    * [Add Educations](##Add-Educations)
    * [List Educations](##List-Educations)
    * [Update Education](##Update-Education)
    * [Remove Education](##Remove-Education)
  * [Gender](#Gender)
    * [Get Gender](##Get-Gender)
    * [Add Gender](##Add-Gender)
    * [List Gender](##List-Gender)
    * [Update Gender](##Update-Gender)
    * [Remove Gender](##Remove-Gender)
  * [Internal](#Internal)
    * [Get Doctor](##Get-Doctor-By-Id)
    * [Get Patient](##Add-Patient-By-Id)
    * [Delete Doctor](##Delete-Doctor-By-Id)
    * [Delete Patient](##Delete-Patient-By-Id)

# Patient

## Add Patient

  Add new patient

* **URL** `/patient/profile/add`

* **Method:** `POST`

* **Data Params**

| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `first_name`          | String     | Required   |
| `last_name`           | String     | Required   |
| `mid_name`            | String     |            |
| `birth_date`          | Date       | Required   |
| `gender_id`           | Integer    | Required   |
| `country`             | String     |            |
| `city`                | String     |            |
| `weigth`              | Float      | Required   |
| `height`              | Float      | Required   |
| `chronic_diseases`    | String     |            |
| `allergies`           | String     |            |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}
        
        
## Update Patient

  Update patient

* **URL** `/patient/profile/update/{id}`

* **Method:** `POST`

* **Data Params**

| Parameter             | Type       |
|-----------------------|------------|
| `first_name`          | String     |
| `last_name`           | String     |
| `mid_name`            | String     |
| `birth_date`          | Date       |
| `gender_id`           | Integer    |
| `country`             | String     |
| `city`                | String     |
| `weigth`              | Float      |
| `height`              | Float      |
| `chronic_diseases`    | String     |
| `allergies`           | String     |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}


## Get Patient

  Get patient

* **URL** `/patient/profile/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
             "id": 1,
             "first_name": "John",
             "last_name": "Smith",
             "mid_name": "Mr",
             "birth_date": "1982-09-06T20:00:00.000Z",
             "gender_id": 1,
             "country": "Russia",
             "city": "Moscow",
             "weigth": 93.5,
             "height": 183.8,
             "chronic_diseases": "chr1, chr2, chr3",
             "allergies": "al1, al2",
             "gender": {
                 "id": 1,
                 "name": "male"
             }
        }
        
        
## Check Patient

  Check if patient_id already updated in Cognito service

* **URL** `/patient/profile/check`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
             "id": 1,
             "first_name": "John",
             "last_name": "Smith",
             "mid_name": "Mr",
             "birth_date": "1982-09-06T20:00:00.000Z",
             "gender_id": 1,
             "country": "Russia",
             "city": "Moscow",
             "weigth": 93.5,
             "height": 183.8,
             "chronic_diseases": "chr1, chr2, chr3",
             "allergies": "al1, al2",
             "gender": {
                 "id": 1,
                 "name": "male"
             }
        }
        
        
## Get Doctors Info

  Patients can get doctors info

* **URL** `/patient/profile/getdoctors`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type          |
|-----------------------|---------------|
| `ids`                 | Array[String] |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        [
            {
                "id": 1,
                "first_name": "John",
                "last_name": "Smith",
                "mid_name": "Mr",
                "birth_date": "1982-09-06T20:00:00.000Z",
                "gender_id": 1,
                "country": "Russia",
                "city": "Moscow"
            },
            ...
        ]


# Doctor

## Add Doctor

  Add new doctor

* **URL** `/doctor/profile/add`

* **Method:** `POST`

* **Data Params**

| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `first_name`          | String     | Required   |
| `last_name`           | String     | Required   |
| `mid_name`            | String     |            |
| `birth_date`          | Date       | Required   |
| `gender_id`           | Integer    | Required   |
| `country`             | String     |            |
| `city`                | String     |            |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}
        

## Update Doctor

  Update doctor

* **URL** `/doctor/profile/update/{id}`

* **Method:** `POST`

* **Data Params**

| Parameter             | Type       |
|-----------------------|------------|
| `first_name`          | String     |
| `last_name`           | String     |
| `mid_name`            | String     |
| `birth_date`          | Date       |
| `gender_id`           | Integer    |
| `country`             | String     |
| `city`                | String     |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}


## Get Doctor

  Get doctor

* **URL** `/doctor/profile/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
             "id": 1,
             "first_name": "John",
             "last_name": "Smith",
             "mid_name": "Mr",
             "birth_date": "1982-09-06T20:00:00.000Z",
             "gender_id": 1,
             "country": "Russia",
             "city": "Moscow",
             "gender": {
                 "id": 1,
                 "name": "male"
             },
             "education": [
                 {
                     "id": 6,
                     "name": "Edu name",
                     "country_city": "Moscow Russia",
                     "faculty": "Fac1",
                     "graduated": "2008-01-04T20:00:00.000Z",
                     "profession": "Prof1",
                     "doctor_id": 1
                 },
                 ...
             ],
             "work": [
                 {
                     "id": 5,
                     "name": "Work name",
                     "country_city": "Moscow Russia",
                     "start_date": "2008-01-04T20:00:00.000Z",
                     "experience": 5,
                     "position": "Pos1",
                     "recommender": "John Smith",
                     "doctor_id": 1
                 },
                 ...
             ]
        }
        
        
## Check Doctor

  Check if patient_id already updated in Cognito service

* **URL** `/doctor/profile/check`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Smith",
            "mid_name": "Mr",
            "birth_date": "1982-09-06T20:00:00.000Z",
            "gender_id": 1,
            "country": "Russia",
            "city": "Moscow",
            "gender": {
                "id": 1,
                "name": "male"
            }
        }
        
        
## Get Patient Info

  Docktors can get patients info

* **URL** `/doctor/profile/getpatients`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type          |
|-----------------------|---------------|
| `ids`                 | Array[String] |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        [
            {
                 "id": 1,
                 "first_name": "John",
                 "last_name": "Smith",
                 "mid_name": "Mr",
                 "birth_date": "1982-09-06T20:00:00.000Z",
                 "gender_id": 1,
                 "country": "Russia",
                 "city": "Moscow",
                 "weigth": 93.5,
                 "height": 183.8,
                 "chronic_diseases": "chr1, chr2, chr3",
                 "allergies": "al1, al2"
            },
            ...
        ]


# Works

## Add Work

  Add new work

* **URL** `/doctor/profile/work/add`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |
| `country_city`        | String     | Required   |
| `experience`          | String     | Required   |
| `start_date`          | Date       | Required   |
| `position`            | String     |            |
| `recommender`         | String     |            |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
        {name: 'success'}
        
        
## Add Works

  Add array of works

* **URL** `/doctor/profile/works/add`

* **Method:** `POST`

* **Data Params**

        [
             {
                 "name": "Work name",
                 "country_city": "Moscow Russia",
                 "start_date": "2008-01-04T20:00:00.000Z",
                 "experience": "123456987",
                 "position": "Pos1",
                 "recommender": "John Smith"
             },
             ...
        ]
        
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |
| `country_city`        | String     | Required   |
| `experience`          | String     | Required   |
| `start_date`          | Date       | Required   |
| `position`            | String     |            |
| `recommender`         | String     |            |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
        {
            name: 'success',
            data: [
                {
                    "id": 5,
                    "name": "Work name",
                    "country_city": "Moscow Russia",
                    "start_date": "2008-01-04T20:00:00.000Z",
                    "experience": "123456789",
                    "position": "Pos1",
                    "recommender": "John Smith",
                    "doctor_id": 1
                },
                ,,,
            ]
        }
    
    
## List Works

  List works by doctor id

* **URL** `/doctor/profile/work/{doctorId}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        [
             {
                 "id": 5,
                 "name": "Work name",
                 "country_city": "Moscow Russia",
                 "start_date": "2008-01-04T20:00:00.000Z",
                 "experience": "123456789",
                 "position": "Pos1",
                 "recommender": "John Smith",
                 "doctor_id": 1
             },
             ...
        ]


## Update Work

  Update work

* **URL** `/doctor/profile/work/update/{id}`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |
| `country_city`        | String     | Required   |
| `experience`          | String     | Required   |
| `start_date`          | Date       | Required   |
| `position`            | String     |            |
| `recommender`         | String     |            |
| `doctor_id`           | Integer    | Required   |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}
    
    
## Remove Work

  Remove work

* **URL** `/doctor/profile/work/remove/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}

        
# Education

## Add Education

  Add new education

* **URL** `/doctor/profile/education/add`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |
| `country_city`        | String     | Required   |
| `graduated`           | Date       | Required   |
| `faculty`             | String     | Required   |
| `profession`          | String     |            |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
        {name: 'success'}
        
        
## Add Educations

  Add array of educations

* **URL** `/doctor/profile/educations/add`

* **Method:** `POST`

* **Data Params**

        [
             {
                 "name": "Edu name",
                 "country_city": "Moscow Russia",
                 "faculty": "Fac1",
                 "graduated": "2008-01-04T20:00:00.000Z",
                 "profession": "Prof1",
             },
             ...
        ]
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |
| `country_city`        | String     | Required   |
| `graduated`           | Date       | Required   |
| `faculty`             | String     | Required   |
| `profession`          | String     |            |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
        {
            name: 'success',
            data: [
               {
                   "id": 6,
                   "name": "Edu name",
                   "country_city": "Moscow Russia",
                   "faculty": "Fac1",
                   "graduated": "2008-01-04T20:00:00.000Z",
                   "profession": "Prof1",
                   "doctor_id": 1
               },
               ...
            ]
        }
    
    
## List Educations

  List educations by doctor id

* **URL** `/doctor/profile/education/{doctorId}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        [
             {
                 "id": 6,
                 "name": "Edu name",
                 "country_city": "Moscow Russia",
                 "faculty": "Fac1",
                 "graduated": "2008-01-04T20:00:00.000Z",
                 "profession": "Prof1",
                 "doctor_id": 1
             },
             ...
        ]


## Update Education

  Update education

* **URL** `/doctor/profile/education/update/{id}`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |
| `country_city`        | String     | Required   |
| `graduated`           | Date       | Required   |
| `faculty`             | String     | Required   |
| `profession`          | String     |            |
| `doctor_id`           | Integer    | Required   |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}
    
    
## Remove Education

  Remove education

* **URL** `/doctor/profile/education/remove/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}

        
# Gender

## Get Gender

  Get gender

* **URL** `/gender/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {"id": 1, "name": "male"}
    

## Add Gender

  Add new gender

* **URL** `/gender/add`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
        {name: 'success'}
    
    
## List Gender

  List genders

* **URL** `/gender`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        [
            {"id": 1, "name": "male"},
            {"id": 2, "name": "female"}
            ...
        ]


## Update Gender

  Update gender

* **URL** `/gender/update/{id}`

* **Method:** `POST`

* **Data Params**
  
| Parameter             | Type       | Other      |
|-----------------------|------------|------------|
| `name`                | String     | Required   |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}
    
    
## Remove Gender

  Remove gender

* **URL** `/gender/remove/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
        {name: 'success'}
        
        
#Internal

## Get Doctor By Id

  Get doctor by id

* **URL** `/lambda/profile/internal/doctor/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Smith",
            "mid_name": "Mr",
            "birth_date": "1982-09-06T20:00:00.000Z",
            "gender_id": 1,
            "country": "Россия",
            "city": "Moscow",
            "sub": "5e1d4f79-41ce-4224-bd24-3a926b9311fc",
            "work": [
                {
                    "id": 1,
                    "name": "work1",
                    "country_city": "Москва Россия",
                    "start_date": "2018-01-31T20:00:00.000Z",
                    "experience": "0",
                    "position": null,
                    "recommender": "123",
                    "doctor_id": 1
                },
                ...
            ],
            "gender": {
                "id": 1,
                "name": "male"
            },
            "education": [
                {
                    "id": 1,
                    "name": "edu1",
                    "country_city": "Москва Россия",
                    "faculty": "fac1",
                    "graduated": "2018-01-31T20:00:00.000Z",
                    "profession": null,
                    "doctor_id": 1
                },
                ...
            ]
        }
        
        
## Get Patient By Id

  Get patient by id

* **URL** `/lambda/profile/internal/patient/{id}`

* **Method:** `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Smith",
            "mid_name": "Mr",
            "birth_date": "1982-09-06T20:00:00.000Z",
            "gender_id": 1,
            "country": "Россия",
            "city": "Москва",
            "weight": 113,
            "height": 195,
            "chronic_diseases": "[]",
            "allergies": "[{\"id\":{\"kind\":\"moleculeVidalId\",\"name\":\"770\"},\"name\":\"ЛУК РЕПЧАТЫЙ\"},{\"id\":{\"kind\":\"productVidalId\",\"name\":\"20871\"},\"name\":\"АГАЛАТЕС\"}]",
            "sub": "063c70ee-c043-4f4e-ba36-25dcb78c7f6b",
            "gender": {
                "id": 1,
                "name": "male"
            }
        }
        
        
## Delete Doctor By Id

  Delete doctor by id

* **URL** `/lambda/profile/internal/doctor/{id}`

* **Method:** `DELETE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
            "name": "success"
        }
        
        
## Delete Patient By Id

  Delete patient by id

* **URL** `/lambda/profile/internal/patient/{id}`

* **Method:** `DELETE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
        
        {
            "name": "success"
        }