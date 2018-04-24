from flask import jsonify, request
import json
import requests

URL = "http://api.learning2earn.me"

def scrape_data():
    subjects = requests.get(URL + "/subjects").json()
    result = {}
    result['name'] = "graph"
    subjectList = []

    for subject in subjects:
        subjectCircle = {}
        subjectCircle['name'] = subject['subject'] 
        courseList = []
        courses = requests.get(URL + "/courses?subjectId=" + str(subject['id'])).json()
        for course in courses:
            courseCircle = {}
            courseCircle['name'] = course['course']
            courseCircle['size'] = course['num-relevant-jobs']
            courseList.append(courseCircle)

        subjectCircle['children'] = courseList
        subjectList.append(subjectCircle)

    result['children'] = subjectList

    with open('data.json', 'w') as outfile:
        json.dump(result, outfile)
        

if __name__ == '__main__':
    scrape_data()
