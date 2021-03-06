# coding: utf-8

from app.core.BaseController import BaseController
from app.models.Project import Project
from app.models.Bug import Bug
from app.models.Cause import Cause
import cherrypy
import json


class ReportController(BaseController):
    def __init__(self):
        BaseController.__init__(self)

    @cherrypy.tools.json_out()
    def projectList(self):
        result = {}
        projects = Project().all()

        for project in projects:
            result[project['name']] = project

        for project in projects:
            for index, component in enumerate(project['components']):
                all_component_reported_bugs = Bug().all(
                    {'component_id': component['id'], 'type': Bug.TYPE_REPORTED})
                all_component_resolved_bugs = Bug().all(
                    {'component_id': component['id'], 'type': Bug.TYPE_RESOLVED})
                all_component_verfied_bugs = Bug().all(
                    {'component_id': component['id'], 'type': Bug.TYPE_SOULTION_VERIFIED})

                result[project['name']]['components'][index]['bugs'] = {}
                result[project['name']]['components'][index]['bugs']['reported'] = all_component_reported_bugs
                result[project['name']]['components'][index]['bugs']['resolved'] = all_component_resolved_bugs
                result[project['name']]['components'][index]['bugs']['soultion_verified'] = all_component_verfied_bugs

        return self.withSuccess(result)


    @cherrypy.tools.json_out()
    def categoryList(self):
        result = {}
        causes = Cause().all()

        for cause in causes:
            result[cause['name']] = cause

        for cause in causes:
            all_reported_bugs = Bug().all(
                {'cause_id': cause['id'], 'type': Bug.TYPE_REPORTED})
            all_resolved_bugs = Bug().all(
                {'cause_id': cause['id'], 'type': Bug.TYPE_RESOLVED})
            all_verfied_bugs = Bug().all(
                {'cause_id': cause['id'], 'type': Bug.TYPE_SOULTION_VERIFIED})

            result[cause['name']]['bugs'] = {}
            result[cause['name']]['bugs']['reported'] = all_reported_bugs
            result[cause['name']]['bugs']['resolved'] = all_resolved_bugs
            result[cause['name']]['bugs']['soultion_verified'] = all_verfied_bugs

        return self.withSuccess(result)
